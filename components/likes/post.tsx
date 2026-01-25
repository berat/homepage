import { getViewAndLike, updateViewAndLike } from "@/lib/redis/views";
import { LikeButton } from "../base/Like";

export async function PageLikes({
  slug,
  type,
}: {
  slug: string;
  type: "post" | "page";
}) {
  let like = 0;

  try {
    const { data } = await getViewAndLike(type, slug);
    like = Number(data?.likes || 0);
  } catch (e) {
    like = 0;
  }

  const handleLike = async (count: number) => {
    "use server";
    return updateViewAndLike(type, slug, "likes", count);
  };

  return (
    <div className="mr-2">
      <LikeButton count={like} handleLike={handleLike} />
    </div>
  );
}
