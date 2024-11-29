import { PostDetailType } from "@/models/post";

import { updateViewPost } from "@/actions/common";
import { getSinglePost } from "@/actions/post";

import PostDetailView from "../view/post";

export default async function PostDetail({ slug }: { slug: string }) {
  const post = await getSinglePost(slug);

  if (typeof post === "boolean") {
    return null;
  }

  const updateView = async () => {
    "use server";
    if (process.env.NODE_ENV === "production") {
      const viewed = await updateViewPost(post.post.id, post.post.view + 1);
      return viewed;
    }
    return false;
  };

  return (
    <PostDetailView post={post as PostDetailType} updateView={updateView} />
  );
}
