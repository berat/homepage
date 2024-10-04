"use server";

import React from "react";
import moment from "moment";
// models
import { PostType } from "@/models/post";
// actions
import { getPosts } from "@/actions/post";
// components
import PostCard from "../cards/post";

type Props = {
  data: PostType[];
};

type GroupedData = Record<string, PostType[]>;

const BlogList: React.FC<Props> = async ({ data }) => {
  const groupedData = await data.reduce((acc: GroupedData, item: PostType) => {
    const date = moment(item.date, "DD MMM, YYYY").year();
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});

  return Object.keys(groupedData)
    .sort((a: string, b: string) => Number(b) - Number(a))
    .map((key: string) => (
      <ul key={key} className="w-full my-4 block">
        <h3 className="text-xl mb-2 text-slate-400 tracking-wide">{key}</h3>
        <div className={"flex gap-4 flex-wrap"}>
          {groupedData[key].map((post: PostType) => (
            <PostCard key={post.id} post={post} isPage />
          ))}
        </div>
      </ul>
    ));
};

const BlogContent = async () => {
  const { data } = await getPosts();

  return (
    <div className={"flex gap-4 flex-col pb-2 items-start "}>
      <BlogList data={data} />
    </div>
  );
};

export default BlogContent;
