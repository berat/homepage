"use client"
import { useEffect } from "react";
import hljs from "highlight.js";
// models
import { PostDetailType } from "@/models/post";
// components
import { Image, NotionRender } from "../base";

interface PostDetailProps {
  post: PostDetailType;
  updateView: () => void;
}

const PostDetailView: React.FC<PostDetailProps> = ({ post, updateView }) => {
  useEffect(() => {
    hljs.highlightAll();
    updateView();
  }, []);

  return (
    <article className="xl:w-[1000px] w-[95%] mx-auto post-content">
      <header
        className={`w-full ${
          post.post.cover ? "lg:w-blog" : "w-[96%]"
        } mx-auto`}
      >
        <h1 className="text-3xl tracking-tight lg:tracking-normal lg:text-3xl font-semibold leading-10 ">
          {post.post.title}
        </h1>
        <small className="text-sm lg:text-base text-[#737373]">
          {post.post.date} • {post.post.view + 1} görüntülenme
        </small>
      </header>
      {post.post.cover && (
        <Image
          src={post.post.cover}
          alt={post.post.title}
          width={1000}
          quality={100}
          rounded="lg"
          height={650}
          className="mt-5 max-h-[650px] rounded-lg object-cover"
        />
      )}
      <div className="mb-3 mt-5">
        {post.content.map((block) => (
          <div key={block.id}>{NotionRender(block)}</div>
        ))}
      </div>
    </article>
  );
};

export default PostDetailView;
