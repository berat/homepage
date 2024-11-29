import React from "react";
import Link from "next/link";

import { ProjectType } from "@/models/project";

import Image from "@/components/base/image";

interface Props {
  post: ProjectType;
}

const ProjectCard: React.FC<Props> = ({ post }) => {
  return (
    <article className={"w-full md:w-[48%] min-w-[40%]"}>
      <Link
        href={`/projects/${post.slug}`}
        className="flex flex-col items-start"
      >
        <div className={"w-full min-h-[255px] rounded-lg"}>
          <Image
            src={post.cover}
            alt={post.title ?? ""}
            width={861}
            rounded="lg"
            height={600}
            className={`rounded-lg object-cover min-h-[255px]`}
          />
        </div>
        <h3 className="mt-3 mb-0.5 text-xl font-semibold text-black">
          {post.title}
        </h3>
        <p className="text-[14px] text-slate-500">{post.summary}</p>
      </Link>
    </article>
  );
};

export default ProjectCard;
