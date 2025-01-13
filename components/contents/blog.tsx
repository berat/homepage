"use server";

import React from "react";
import { draftMode } from "next/headers";

import { getAllPosts } from "@/actions/post";
import { updateViewAndLike } from "@/actions/viewLike";

import BlogWrapper from "./blogWrapper";

const BlogContent = async () => {
  const { isEnabled } = await draftMode();
  const { posts: allPosts, categories } = await getAllPosts(100, isEnabled);
  await updateViewAndLike("page", "blog", "views");

  return <BlogWrapper initialPosts={allPosts} categories={categories} />;
};

export default BlogContent;
