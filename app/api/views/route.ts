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