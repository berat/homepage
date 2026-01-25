// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const locales = ["tr", "en"] as const;
const defaultLocale = "en";

// Bot user agent'larını tespit et (SEO için önemli)
function isBot(userAgent: string): boolean {
    const botPatterns = [
        "googlebot",
        "bingbot",
        "slurp",
        "duckduckbot",
        "baiduspider",
        "yandexbot",
        "facebookexternalhit",
        "linkedinbot",
        "twitterbot",
        "whatsapp",
        "telegrambot",
        "applebot",
        "gptbot",
        "claudebot",
        "anthropic-ai",
        "petalbot",
        "chrome-lighthouse",
    ];

    const lowerUA = userAgent.toLowerCase();
    return botPatterns.some((pattern) => lowerUA.includes(pattern));
}

// Kullanıcının tercih ettiği dili tespit et
function getPreferredLocale(req: NextRequest): string {
    const acceptLanguage = req.headers.get("accept-language");

    if (!acceptLanguage) {
        return defaultLocale;
    }

    // Accept-Language header'ını parse et (örn: "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7")
    const languages = acceptLanguage
        .split(",")
        .map((lang) => {
            const [locale, priority] = lang.trim().split(";");
            const q = priority ? parseFloat(priority.split("=")[1]) : 1.0;
            return { locale: locale.split("-")[0].toLowerCase(), q };
        })
        .sort((a, b) => b.q - a.q); // Önceliğe göre sırala

    // İlk eşleşen dili bul
    for (const { locale } of languages) {
        if (locales.includes(locale as (typeof locales)[number])) {
            return locale;
        }
    }

    return defaultLocale;
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userAgent = req.headers.get("user-agent") || "";

    // Bot mu kontrol et - botları redirect etme (SEO için)
    const isCrawler = isBot(userAgent);

    // 1) root -> kullanıcılar için dil tespiti, botlar için default locale
    if (pathname === "/") {
        const url = req.nextUrl.clone();

        if (isCrawler) {
            // Botlar için varsayılan dile yönlendir, sitemap.xml'den diğer dilleri bulacaklar
            url.pathname = `/${defaultLocale}`;
        } else {
            // Normal kullanıcılar için tercih edilen dile yönlendir
            const preferredLocale = getPreferredLocale(req);
            url.pathname = `/${preferredLocale}`;
        }

        return NextResponse.redirect(url);
    }

    // 2) /tr veya /en ile başlamıyorsa
    const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
    if (!hasLocale) {
        if (isCrawler) {
            // Botlar için varsayılan dile yönlendir
            const url = req.nextUrl.clone();
            url.pathname = `/${defaultLocale}${pathname}`;
            return NextResponse.redirect(url);
        }

        // Normal kullanıcılar için tercih edilen dile yönlendir
        const preferredLocale = getPreferredLocale(req);
        const url = req.nextUrl.clone();
        url.pathname = `/${preferredLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
