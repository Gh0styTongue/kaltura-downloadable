import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Force dynamic to prevent caching the response
export const dynamic = 'force-dynamic';

// Database config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Helper for consistency with PHP logic
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  // 1. Validation
  if (!id) {
    return NextResponse.json(
      { status: 'error', code: 400, message: "Uh oh! You need a valid ID." }, 
      { status: 400 }
    );
  }

  try {
    // 2. Database Lookup
    const connection = await mysql.createConnection(dbConfig);
    const [rows]: any = await connection.execute(
      'SELECT title, downloadable_url FROM disney_videos WHERE id = ? LIMIT 1',
      [id]
    );
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json(
        { status: 'error', code: 404, message: "We looked everywhere, but this relic seems to be lost in the Disney Vault." },
        { status: 404 }
      );
    }

    const video = rows[0];
    const url = video.downloadable_url;
    const title = video.title;

    if (!url) {
      return NextResponse.json(
        { status: 'error', code: 404, message: "This attraction is currently down for refurbishment (No Source URL)." },
        { status: 404 }
      );
    }

    // 3. Clean Filename
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s_-]/g, '').replace(/\s+/g, ' ');
    const filename = `${cleanTitle.replace(/ /g, '_')}.mp4`;

    // 4. Pre-Flight Check (Resolve Redirects)
    // fetch() automatically follows redirects by default.
    // We perform a HEAD request first to inspect headers without downloading the body.
    const preFlight = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': userAgent },
      redirect: 'follow', // Follows 301/302 automatically
    });

    const finalUrl = preFlight.url;
    const httpCode = preFlight.status;
    const contentType = preFlight.headers.get('content-type') || '';
    const contentLength = preFlight.headers.get('content-length');
    const downloadSize = contentLength ? parseInt(contentLength, 10) : 0;

    // 5. Error Handling (Thematic)
    if (httpCode === 403) {
      return NextResponse.json(
        { status: 'error', code: 403, message: "The First Order has blocked this transmission. Access Restricted." },
        { status: 403 }
      );
    }

    if (httpCode === 404) {
      return NextResponse.json(
        { status: 'error', code: 404, message: "Stitch ate the source file. It is no longer available on the remote server." },
        { status: 404 }
      );
    }

    if (httpCode >= 400) {
      return NextResponse.json(
        { status: 'error', code: httpCode, message: "A disturbance in the Force occurred while contacting the remote server." },
        { status: httpCode }
      );
    }

    if (contentType.toLowerCase().includes('text/html')) {
      return NextResponse.json(
        { status: 'error', code: 502, message: "Glitch in the Grid. We retrieved a web page instead of a video stream." },
        { status: 502 }
      );
    }

    if (downloadSize > 0 && downloadSize < 5000) {
      return NextResponse.json(
        { status: 'error', code: 502, message: "We ran out of Pixie Dust. The file integrity check failed (File too small)." },
        { status: 502 }
      );
    }

    // 6. Stream Download
    // We request the FINAL resolved URL to get the stream
    const fileResponse = await fetch(finalUrl, {
      headers: { 'User-Agent': userAgent }
    });

    if (!fileResponse.body) {
      return NextResponse.json({ status: 'error', code: 500, message: "Stream initialization failed." }, { status: 500 });
    }

    // Prepare headers for the client
    const headers = new Headers();
    headers.set('Content-Description', 'File Transfer');
    headers.set('Content-Type', 'video/mp4');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Transfer-Encoding', 'binary');
    headers.set('Cache-Control', 'must-revalidate');
    headers.set('Pragma', 'public');
    
    if (downloadSize > 0) {
      headers.set('Content-Length', downloadSize.toString());
    }

    // Return the stream directly
    return new NextResponse(fileResponse.body, {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    console.error('Download API Error:', error);
    return NextResponse.json(
      { status: 'error', code: 500, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}