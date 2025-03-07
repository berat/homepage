import { NextResponse } from "next/server";

import "moment/locale/tr";

import { BookmarkType } from "@/models/bookmark";

const collectionId: number = 25106674;
export const runtime = "edge";
export const revalidate = 3600;

export async function GET() {
  try {
    const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=50`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.RAINDROP_API_KEY,
      },
    });

    const data = await response.json();

    if (data.result === true) {
      const { items } = data;
      const categories = ["Hepsi"];

      items.map((item: BookmarkType) => {
        item.tags.map((t) => t && categories.push(t));
      });

      return NextResponse.json({
        status: 200,
        data: items,
        categories: [...new Set(categories)],
      });
    } else {
      return NextResponse.json({ status: 400, err: data.errorMessage });
    }
  } catch (err) {
    return NextResponse.json({ status: 400 });
  }
}
