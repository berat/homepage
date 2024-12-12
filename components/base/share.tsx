"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ConfettiExplosion from "react-confetti-explosion";

interface Props {
  likeCount: number;
  title: string;
  handleLikeRequest?: (count: number) => void;
}
const ShareView: React.FC<Props> = ({
  likeCount,
  title,
  handleLikeRequest,
}) => {
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>();
  const [canLike, setCanLike] = useState<boolean>(true);
  const clickTimer = useRef(null);

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

  useEffect(() => {
    setUrl(typeof window !== "undefined" ? window.location.href : "");

    return () => {
      clearTimeout(clickTimer.current);
      setIsLiked(false);
    };
  }, []);

  const plusLikes: string = localLikeCount > 0 ? `(+${localLikeCount})` : "";
  const clickedLikeButton: string =
    isLiked !== undefined && isLiked !== true ? plusLikes : "";
  const totalLike: number = isLiked ? localLikeCount + likeCount : likeCount;

  return (
    <div className="w-full mx-auto flex items-center gap-2.5">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-3 py-1 text-text rounded-full bg-white border-2 border-lightGray ${
          !canLike ? "opacity-40" : "opacity-100"
        }`}
        disabled={!canLike}
      >
        👍🏼
        <span className="font-semibold text-sm">{`${totalLike} ${clickedLikeButton}`}</span>
      </button>
      <span className="text-disable font-thin text-2xl"> • </span>
      <div className="text-text">
        <Link
          href={`https://x.com/intent/tweet?url=${url}&via=beratbozkurt0&text=${title}`}
          target="_blank"
          className="text-[#1DA1F2] font-semibold"
        >
          X (Twitter)
        </Link>
        {"'"}
        da paylaş
      </div>
      {!canLike && <ConfettiExplosion />}
    </div>
  );
};

export default ShareView;
