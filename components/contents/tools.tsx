"use server";

import { draftMode } from "next/headers";

import { getPage } from "@/actions/pages";
import { updateViewAndLike } from "@/actions/viewLike";

import { Markdown } from "../base";

export default async function ToolsContent({
  isTurkish = true,
}: {
  isTurkish?: boolean;
}) {
  const { isEnabled } = await draftMode();
  const { post } = await getPage("tools", isEnabled, isTurkish);
  await updateViewAndLike("page", isTurkish ? "" : "en/" + "tools", "views");

  return (
    <div className="mb-3  detail-content">
      <Markdown content={post.content} />
    </div>
  );
}
