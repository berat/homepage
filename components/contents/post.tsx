import { draftMode } from "next/headers";

import { PostDetailType } from "@/models/post";

import { getPostAndMorePosts } from "@/actions/post";
import { getViewAndLike, updateViewAndLike } from "@/actions/viewLike";

import PostDetailView from "../view/post";

export default async function PostDetail({
  slug,
  isTurkish = true,
}: {
  isTurkish?: boolean;
  slug: string;
}) {
  const { isEnabled } = await draftMode();

  const { post } = await getPostAndMorePosts(slug, isEnabled, isTurkish);
  const { data } = await getViewAndLike(
    "post",
    (isTurkish ? "" : "en/") + (slug as string),
  );

  if (typeof post === "boolean") {
    return null;
  }

  const updateView = async () => {
    "use server";
    await updateViewAndLike("post", (isTurkish ? "" : "en/") + slug, "views");
  };

  const updateLike = async (count: number) => {
    "use server";
    await updateViewAndLike(
      "post",
      (isTurkish ? "" : "en/") + slug,
      "likes",
      count - data.likes,
    );
  };

  return (
    <PostDetailView
      likeCount={data.likes}
      post={post as PostDetailType}
      view={data.views}
      handleLikeRequest={updateLike}
      updateView={updateView}
      isTurkish={isTurkish}
    />
  );
}
