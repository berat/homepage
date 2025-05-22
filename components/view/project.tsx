"use client";

import { useEffect } from "react";
import Link from "next/link";
import hljs from "highlight.js";

import { ProjectDetailType } from "@/models/project";

import { Image, Markdown } from "../base";

import ArrowUpRight from "@/public/icons/arrow-up-right.svg";

interface ProjectDetailProps {
  post: ProjectDetailType;
  isTurkish?: boolean;
  updateView: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailProps> = ({
  post,
  isTurkish = true,
  updateView,
}) => {
  useEffect(() => {
    hljs.highlightAll();
    updateView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className="xl:w-[1000px] w-[95%] mx-auto post-content">
      <header
        className={`w-[96%] lg:w-[95%] flex flex-col md:flex-row items-start justify-center gap-2.5 mx-auto`}
      >
        <div className="flex-1 flex flex-col gap-2 md:gap-6 md:pt-10 md:pb-4">
          <h1 className="text-3xl tracking-tight lg:tracking-normal lg:text-3xl font-semibold leading-10 dark:text-white">
            {post.title}
          </h1>
          <span className="text-2xl font-light leading-10 block hyphens-auto flex-1 dark:text-darkText">
            {post.summary}
          </span>
          <div className="hidden md:inline-flex gap-4">
            {post.demo && (
              <Link
                href={post.demo}
                target="_blank"
                className="w-fit inline-flex justify-center items-center gap-1 bg-lightGray hover:bg-disable font-medium text-black py-2 px-6 rounded-lg"
              >
                <span>Demo</span>
                <Image
                  src={ArrowUpRight}
                  width={18}
                  height={18}
                  alt={"open new icon"}
                />
              </Link>
            )}
            {post.source && (
              <Link
                href={post.source}
                target="_blank"
                className="w-fit  inline-flex justify-center items-center gap-1 bg-lightGray hover:bg-disable font-medium text-black py-2 px-6 rounded-lg"
              >
                <span>{isTurkish ? "Kaynak" : "Source"}</span>
                <Image
                  src={ArrowUpRight}
                  width={18}
                  height={18}
                  alt={"open new icon"}
                />
              </Link>
            )}
          </div>
        </div>
        <Image
          src={post.cover.url}
          alt={post.title ?? ""}
          width={575}
          quality={100}
          rounded="lg"
          height={400}
          className="mt-5 mb-4 w-full md:w-[inherit] md:mb-0 md:max-h-[450px] rounded-lg object-cover"
        />
        <div className="w-full inline-flex md:hidden gap-4">
          {post.demo && (
            <Link
              href={post.demo}
              target="_blank"
              className="w-full inline-flex justify-center items-center gap-1 bg-lightGray hover:bg-disable font-medium text-black py-2 px-6 rounded-lg"
            >
              <span>Demo</span>
              <Image
                src={ArrowUpRight}
                width={18}
                height={18}
                alt={"open new icon"}
              />
            </Link>
          )}
          {post.source && (
            <Link
              href={post.source}
              target="_blank"
              className="w-full inline-flex justify-center items-center gap-1 bg-lightGray hover:bg-disable font-medium text-black py-2 px-6 rounded-lg"
            >
              <span>{isTurkish ? "Kaynak" : "Source"}</span>
              <Image
                src={ArrowUpRight}
                width={18}
                height={18}
                alt={"open new icon"}
              />
            </Link>
          )}
        </div>
      </header>
      <div className="detail-content mb-3 mt-5">
        <Markdown content={post.content} />
      </div>
    </article>
  );
};

export default ProjectDetailView;
