"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import moment from "moment";

import { Image, Markdown } from "../base";

import "moment/locale/tr";

import ConfettiExplosion from "react-confetti-explosion";

import { PostDetailType } from "@/models/post";

interface PostDetailProps {
  post: PostDetailType;
  likeCount: number;
  handleLikeRequest?: (count: number) => void;
  view: number;
  updateView: () => void;
}
const PostDetailView: React.FC<PostDetailProps> = ({
  post,
  view,
  likeCount,
  handleLikeRequest,
  updateView,
}) => {
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [canLike, setCanLike] = useState<boolean>(true);
  const clickTimer = useRef(null);

  useEffect(() => {
    hljs.highlightAll();
    updateView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = () => {
    if (localLikeCount + 1 > 10) {
      setCanLike(false);
      setIsLiked(true);
      handleLikeRequest(localLikeCount + likeCount);
    } else if (canLike && localLikeCount < 10) {
      setLocalLikeCount((prevCount) => prevCount + 1);
      setIsLiked(false);

      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        handleLikeRequest(localLikeCount + 1 + likeCount);
        setIsLiked(true);
      }, 1000);
    }
  };

  const plusLikes: string = localLikeCount > 0 ? `(+${localLikeCount})` : "";
  const clickedLikeButton: string =
    isLiked !== undefined && isLiked !== true ? plusLikes : "";
  const totalLike: number = isLiked ? localLikeCount + likeCount : likeCount;

  return (
    <article className="xl:w-[1000px] w-[95%] mx-auto post-content">
      <header className={`w-full mx-auto`}>
        <h1 className="text-3xl tracking-tight lg:tracking-normal lg:text-3xl font-semibold leading-10 ">
          {post.title}
        </h1>
        <div className="flex gap-1 items-center mt-1.5">
          <small className="text-sm lg:text-base text-[#737373]">
            {moment(post.date).format("DD MMMM YYYY")} • {view + 1} görüntülenme
            •{" "}
          </small>
          <button
            onClick={handleLike}
            className={`text-text flex gap-1.5 ml-2 items-center ${!canLike ? "opacity-40" : "opacity-100"}`}
            disabled={!canLike}
          >
            👍🏼
            <span className="font-semibold text-sm">{`${totalLike} ${clickedLikeButton}`}</span>
          </button>
          {!canLike && <ConfettiExplosion />}
        </div>
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
