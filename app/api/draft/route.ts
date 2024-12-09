import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { getPostAndMorePosts } from "@/actions/post";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  const slug = searchParams.get("slug");

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const { post: article } = await getPostAndMorePosts(slug, true);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  (await draftMode()).enable();
  redirect(`/blog/${article.slug}`);
}
