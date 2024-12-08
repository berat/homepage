"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import moment from "moment";

import { Image, Markdown } from "../base";

import "moment/locale/tr";

import { PostDetailType } from "@/models/post";

interface PostDetailProps {
  post: PostDetailType;
  view: number;
  updateView: () => void;
}
const PostDetailView: React.FC<PostDetailProps> = ({
  post,
  view,
  updateView,
}) => {
  useEffect(() => {
    hljs.highlightAll();
    updateView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="xl:w-[1000px] w-[95%] mx-auto post-content">
      <header className={`w-full mx-auto`}>
        <h1 className="text-3xl tracking-tight lg:tracking-normal lg:text-3xl font-semibold leading-10 ">
          {post.title}
        </h1>
        <small className="text-sm lg:text-base text-[#737373]">
          {moment(post.date).format("DD MMMM YYYY")} • {view + 1} görüntülenme
        </small>
      </header>
      {post.cover && (
        <Image
          src={post.cover.url}
          alt={post.title ?? ""}
          width={1000}
          quality={75}
          rounded="lg"
          height={650}
          priority={false}
          className="mt-5 max-h-[650px] rounded-lg object-cover"
        />
      )}
      <div className="mb-3 mt-5 detail-content">
        <Markdown content={post.content} />
      </div>
    </article>
  );
};

export default PostDetailView;
