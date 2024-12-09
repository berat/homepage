import { redirect } from "next/navigation";

import { getAllPosts } from "@/actions/post";

export async function GET(request, res) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const article = await getAllPosts(100, false);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  res.draftMode({ enable: true });
  redirect(`/articles/${article.slug}`);
}
