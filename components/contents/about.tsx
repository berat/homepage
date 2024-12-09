"use server";

import { draftMode } from "next/headers";

import { getPage } from "@/actions/pages";
import { updateViewAndLike } from "@/actions/viewLike";

import { Markdown } from "../base";

export default async function AboutContent() {
  const { isEnabled } = await draftMode();
  const { post } = await getPage("about", isEnabled);

  await updateViewAndLike("page", "about", "views");

  return (
    <div className="mb-3  detail-content">
      <Markdown content={post.content} />
    </div>
  );
}
