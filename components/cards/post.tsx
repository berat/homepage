import React from "react";
import Link from "next/link";
// models
import { PostType } from "@/models/post";
// components
import Image from "../base/image";

interface Props {
  post: PostType;
  isPage?: boolean;
}

const PostCard: React.FC<Props> = ({ post, isPage }) => {

  return (
    <article
      className={`${
        isPage ? "lg:h-[300px]" : "lg:h-[275px]"
      } min-w-[48%] lg:min-w-[31.5%] h-[240px] relative rounded-lg z-40`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className={"w-full h-[240px] lg:h-full absolute z-10  rounded-lg"}>
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.title}
              width={800}
              rounded="lg"
              height={500}
              className={`${
                isPage ? "h-[240px] lg:h-[300px]" : "h-[230px] lg:h-[275px]"
              }  rounded-lg object-cover`}
            />
          )}
          <div
            className={
              "w-full h-full bg-bg-gradient absolute top-0 left-0  rounded-lg"
            }
          />
        </div>
        <div
          className={
            "px-1 w-full absolute z-20 text-center translate-y-[112.5px]"
          }
        >
          <small className={"text-sm leading-5 text-gray"}>{post.date}</small>
          <h4 className={"font-semibold text-xl leading-5 text-white"}>
            {post.title}
          </h4>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
