import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "maepace.com";

/**
 * www.maepace.com へのアクセスを apex へ 301 で寄せる。
 *
 * apex を正とするのは、口頭で伝えられる形が1つだけの方が良いため
 * （docs/brand/maepace.md のドメイン方針）。2つのホストで同じ内容を
 * 配信すると重複コンテンツにもなる。
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === `www.${CANONICAL_HOST}`) {
    const url = new URL(request.url);
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // 静的アセットと画像は素通しする。リダイレクト判定は入口のホストで
  // 決まるので、アセット1本ごとに middleware を通す意味がない。
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
