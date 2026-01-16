// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const locales = ["tr", "en"] as const;
const defaultLocale = "en";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1) root -> /en (istersen Accept-Language ile seçebiliriz)
    if (pathname === "/") {
        const url = req.nextUrl.clone();
        url.pathname = `/${defaultLocale}`;
        return NextResponse.redirect(url);
    }

    // 2) /tr veya /en ile başlamıyorsa
    const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
    if (!hasLocale) {
        const url = req.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
