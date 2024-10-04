"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
// assets
import LikeIcon from "@/public/icons/heart.svg";
import XIcon from "@/public/icons/x-white.svg";
import CopyIcon from "@/public/icons/copy.svg";

interface Props {
  likeCount: number;
  title: string;
  handleLikeRequest?: (count: number) => void;
}
const ShareButtons: React.FC<Props> = ({
  likeCount,
  title,
  handleLikeRequest,
}) => {
  const url: string = typeof window !== "undefined" ? window.location.href : "";

  const [localLikeCount, setLocalLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [canLike, setCanLike] = useState<boolean>(true);
  const clickTimer = useRef(null);

  const handleShare = () => {
    const twitterURL = `https://x.com/intent/tweet?url=${url}&via=beratbozkurt0&text=${title}`;
    window.open(twitterURL, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

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
    <div className="xl:w-[1000px] mx-auto flex items-center gap-2.5">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg ${
          !canLike ? "bg-[#f23434]" : "bg-[#d02c2c]"
        }`}
        disabled={!canLike}
      >
        <Image src={LikeIcon} alt="menu" width={18} height={18} />
        <span className="font-semibold text-sm">{`${totalLike} ${clickedLikeButton}`}</span>
      </button>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg"
      >
        <Image src={XIcon} alt="menu" width={18} height={18} />
        <span className="font-semibold text-sm">Paylaş</span>
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-[#DCDCDC] text-base rounded-lg"
      >
        <Image src={CopyIcon} alt="menu" width={18} height={18} />
        <span className="font-semibold text-sm">Kopyala</span>
      </button>
      {!canLike && <ConfettiExplosion />}
    </div>
  );
};

export default ShareButtons;
