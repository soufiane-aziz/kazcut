import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '';
  const pubId = publisherId.replace(/^ca-/, '').trim();

  if (!pubId) {
    return new NextResponse('# Google AdSense ads.txt - Set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID in Vercel\n', {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

