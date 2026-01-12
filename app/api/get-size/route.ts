import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BRIDGE_URL = process.env.PHP_BRIDGE_URL;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ status: 'error', code: 400, message: "Missing ID" }, { status: 400 });
  }

  if (!BRIDGE_URL) {
    return NextResponse.json({ status: 'error', code: 500, message: "Bridge Config Error" }, { status: 500 });
  }

  try {
    const bridgeResponse = await fetch(`${BRIDGE_URL}?id=${id}`, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store'
    });

    if (!bridgeResponse.ok) {
      return NextResponse.json({ status: 'error', code: 404, message: "Video not found in Bridge" }, { status: 404 });
    }

    const data = await bridgeResponse.json();
    const url = data.url;

    if (!url) {
      return NextResponse.json({ status: 'error', code: 404, message: "No source URL" }, { status: 404 });
    }

    const preFlight = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });

    const contentLength = preFlight.headers.get('content-length');
    const size = contentLength ? parseInt(contentLength, 10) : 0;

    return NextResponse.json({ status: 'success', id: id, size: size });

  } catch (error) {
    return NextResponse.json({ status: 'error', code: 500, message: "Internal Error" }, { status: 500 });
  }
}