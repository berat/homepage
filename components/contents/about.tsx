"use server";

import { getBlocks } from "@/utils/parser";

import { NotionRender } from "@/components/base";

export default async function AboutContent() {
  const content = await getBlocks("10d4e99b150e80ed8304ed30047e443d");

  return (
    <div className="mb-3">
      {content.map((block) => (
        <div key={block.id}>{NotionRender(block)}</div>
      ))}
    </div>
  );
}
