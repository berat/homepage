import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "edge";
export const revalidate = 3600;
const redis = Redis.fromEnv();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;

    const slug = searchParams.get("slug");
    const pageType = searchParams.get("pageType");

    try {
        if (pageType === "page") {
            const keys = await redis.keys(`${slug}*`);

            // Yanlış kayıt edilmiş key'leri filtrele
            const isValidKey = (key: string): boolean => {
                // 1. "." içermemeli
                if (key.includes('.')) return false;

                // 2. ":" sonrası boş olmamalı
                const colonIndex = key.indexOf(':');
                if (colonIndex !== -1 && colonIndex === key.length - 1) return false;

                // 3. Slug'dan sonraki path büyük harfle başlamamalı
                // Örnek: "post:/my-article" veya "post:en/my-article"
                const prefix = `${slug}`;
                if (key.startsWith(prefix)) {
                    const pathAfterSlug = key.substring(prefix.length);
                    if (pathAfterSlug.length > 0 && /^[A-Z]/.test(pathAfterSlug)) {
                        return false;
                    }
                }

                return true;
            };

            const filteredKeys = keys.filter(isValidKey);

            let totalViews = 0;

            for (const key of filteredKeys) {
                const data = await redis.hgetall(key);
                totalViews += Number(data?.views || 0);
            }

            return NextResponse.json({
                status: 200,
                data: { views: totalViews },
            });
        }

        // Normal tek bir öğe için views/likes
        const data = await redis.hgetall(`${pageType}:${slug}`);
        return NextResponse.json({
            status: 200,
            data: { views: data?.views || 0, likes: data?.likes || 0 },
        });
    } catch (err) {
        return NextResponse.json({ status: 400 });
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export async function PUT(req,) {
    const searchParams = req.nextUrl.searchParams;

    const slug = searchParams.get("slug");
    const type = searchParams.get("type");
    const count = searchParams.get("count");
    const pageType = searchParams.get("pageType");

    try {
        await redis.hincrby(
            `${pageType}:${slug}`,
            type,
            type === "likes" ? count || 1 : 1,
        );
        return NextResponse.json({
            status: 200,
            message: "View incremented",
        });
    } catch (err) {
        return NextResponse.json({ status: 400 });
    }
}