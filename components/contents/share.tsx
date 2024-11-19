// models
import { PostDetailType } from "@/models/post";
// actions
import { getSinglePost, likedPost } from "@/actions/post";
// components
import ShareView from "../base/share";

export default async function ShareButtons({ slug }: { slug: string }) {
  const post: boolean | PostDetailType = await getSinglePost(slug);

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
