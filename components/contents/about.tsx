"use server";

import { getPage } from "@/actions/pages";
import { updateViewAndLike } from "@/actions/viewLike";

import { Markdown } from "../base";

export default async function AboutContent() {
  const { post } = await getPage("about", false);

  await updateViewAndLike("page", "about", "views");

  return (
    <div className="mb-3  detail-content">
      <Markdown content={post.content} />
    </div>
  );
}
