import { getPostAndMorePosts } from "@/actions/post";
import { getProjectAndMoreProjects } from "@/actions/project";
import { getViewAndLike, updateViewAndLike } from "@/actions/viewLike";

import ShareView from "../base/share";

export default async function ShareButtons({
  category = "blog",
  slug,
}: {
  category?: "blog" | "project";
  slug: string;
}) {
  const { data } = await getViewAndLike(
    category === "blog" ? "post" : "project",
    slug as string,
  );

  let post;
  if (category === "blog") {
    const { post: getPosts } = await getPostAndMorePosts(slug, false);
    post = getPosts;
  } else {
    const { project } = await getProjectAndMoreProjects(slug, false);
    post = project;
  }

  if (typeof post === "boolean") {
    return null;
  }
  const updateLike = async (count: number) => {
    "use server";
    await updateViewAndLike(
      category === "blog" ? "post" : "project",
      slug,
      "likes",
      count - data.likes,
    );
  };

  return (
    <ShareView
      likeCount={data.likes}
      title={post.title}
      handleLikeRequest={updateLike}
    />
  );
}
