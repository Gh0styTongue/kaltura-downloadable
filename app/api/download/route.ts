import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BRIDGE_URL = process.env.PHP_BRIDGE_URL;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { status: 'error', code: 400, message: "Uh oh! You need a valid FastPass ID to enter this attraction." }, 
      { status: 400 }
    );
  }

  if (!BRIDGE_URL) {
    return NextResponse.json(
      { status: 'error', code: 500, message: "The Monorail is down. (Bridge URL not configured)." },
      { status: 500 }
    );
  }

  try {
    const bridgeResponse = await fetch(`${BRIDGE_URL}?id=${id}`, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store'
    });

    if (!bridgeResponse.ok) {
        if (bridgeResponse.status === 404) {
            return NextResponse.json(
                { status: 'error', code: 404, message: "We looked everywhere, but this relic seems to be lost in the Disney Vault." },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { status: 'error', code: 500, message: "Communication breakdown with the Archive Droids (Bridge Error)." },
            { status: 500 }
        );
    }

    const data = await bridgeResponse.json();
    const url = data.url;
    const title = data.title;

    if (!url) {
      return NextResponse.json(
        { status: 'error', code: 404, message: "This attraction is currently down for refurbishment (No Source URL)." },
        { status: 404 }
      );
    }

    const cleanTitle = title.replace(/[^a-zA-Z0-9\s_-]/g, '').replace(/\s+/g, ' ');
    const filename = `${cleanTitle.replace(/ /g, '_')}.mp4`;

    const preFlight = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });

    const finalUrl = preFlight.url;
    const httpCode = preFlight.status;
    const contentType = preFlight.headers.get('content-type') || '';
    const contentLength = preFlight.headers.get('content-length');
    const downloadSize = contentLength ? parseInt(contentLength, 10) : 0;

    const SIZE_LIMIT = 499 * 1024 * 1024;

    if (downloadSize > SIZE_LIMIT) {
      return NextResponse.redirect(finalUrl);
    }

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

    const fileResponse = await fetch(finalUrl, {
      headers: { 'User-Agent': USER_AGENT }
    });

    if (!fileResponse.body) {
      return NextResponse.json({ status: 'error', code: 500, message: "Stream initialization failed." }, { status: 500 });
    }

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

    return new NextResponse(fileResponse.body, {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    return NextResponse.json(
      { status: 'error', code: 500, message: "Internal Server Error." },
      { status: 500 }
    );
  }
}