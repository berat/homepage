import { likedPost } from "@/actions/common";
import { getSinglePost } from "@/actions/post";
import { getSingleProject } from "@/actions/project";

import ShareView from "../base/share";

export default async function ShareButtons({
  category = "blog",
  slug,
}: {
  category?: "blog" | "project";
  slug: string;
}) {
  let post;
  if (category === "blog") {
    post = await getSinglePost(slug);
  } else {
    post = await getSingleProject(slug);
  }

  if (typeof post === "boolean") {
    return null;
  }

  const updateLike = async (count: number) => {
    "use server";
    const liked = await likedPost(post.post.id, count);
    return liked;
  };

  return (
    <ShareView
      likeCount={post.post.like}
      title={post.post.title}
      handleLikeRequest={updateLike}
    />
  );
}
