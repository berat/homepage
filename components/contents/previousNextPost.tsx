"use server";

import { draftMode } from "next/headers";

import { getPostAndMorePosts } from "@/actions/post";

import { PostCard } from "../cards";

const PreviousNextPosts = async ({ slug }: { slug: string }) => {
  const { isEnabled } = await draftMode();
  const { morePosts: posts } = await getPostAndMorePosts(slug, isEnabled);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="text-xl lg:text-xl font-semibold tracking-tight text-black leading-10 mb-4">
        Benzer Yazılar
      </h3>
      <div className={"flex lg:flex-row flex-col gap-4 flex-wrap"}>
        {posts.map((post) => (
          <PostCard isPage key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PreviousNextPosts;
