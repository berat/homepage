import React from "react";
import Link from "next/link";

import { ProjectType } from "@/models/project";

import Image from "@/components/base/image";

interface Props {
  post: ProjectType;
  isHome?: boolean;
}

const ProjectCard: React.FC<Props> = ({ post, isHome }) => {
  return (
    <article
      className={`w-full md:w-[48%] ${isHome ? "min-w-[47%] md:min-w-[40%]" : "min-w-[40%]"}`}
    >
      <Link
        href={`/projects/${post.slug}`}
        className="flex flex-col items-start"
      >
        <div
          className={`w-full ${isHome ? "h-auto md:min-h-[255px]" : "min-h-[255px]"} rounded-lg`}
        >
          {post.cover.url && (
            <Image
              src={post.cover.url}
              alt={post.title ?? ""}
              width={861}
              rounded="lg"
              height={600}
              className={`rounded-lg object-cover ${isHome ? "h-auto md:min-h-[255px]" : "min-h-[255px]"}`}
            />
          )}
        </div>
        <h3 className="mt-3 mb-0.5 text-xl font-semibold dark:text-white text-black">
          {post.title}
        </h3>
        <p className="text-[14px] dark:text-slate-500 text-slate-500">
          {post.summary}
        </p>
      </Link>
    </article>
  );
};

export default ProjectCard;
