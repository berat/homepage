// models
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { defaultDateFormat, getCategory, getRandomInt } from "@/utils/helpers";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getPageMetaData = (post: PageObjectResponse) => {
  const properties = post?.properties as PageObjectResponse["properties"];

  if (!properties) return false;

  return {
    id: post.id,
    cover: post.cover?.type ? post.cover[post.cover.type].url : null,
    title: (properties.Name as any).title[0].plain_text,
    category: getCategory((properties.Category as any).multi_select),
    ...(properties.Date
      ? { date: defaultDateFormat((properties.Date as any).date?.start) }
      : {}),
    ...(properties.Summary
      ? { summary: (properties.Summary as any).rich_text[0].plain_text }
      : {}),
    ...(properties.Status
      ? { status: (properties.Status as any).status.name }
      : {}),
    ...(properties.Source
      ? { source: (properties.Source as any).rich_text[0]?.plain_text }
      : {}),
    ...(properties.Demo
      ? { demo: (properties.Demo as any).rich_text[0]?.plain_text }
      : {}),
    slug: (properties.Slug as any).rich_text[0]?.plain_text,
    like: (properties.Like as any).number,
    view: (properties.View as any).number,
  };
};

export const getBlocks = async (blockID) => {
  const blockId = blockID.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = results.map(async (block) => {
    // @ts-ignore
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });

  return Promise.all(childBlocks).then((blocks) =>
    blocks.reduce((acc, curr) => {
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []),
  );
};
