import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const likedPost = async (id: string, count: number) => {
  const response = await notion.pages.update({
    page_id: id,
    properties: {
      Like: {
        number: count,
      },
    },
  });

  return response;
};

export const updateViewPost = async (id: string, count: number) => {
  if (process.env.NODE_ENV !== "production") return null;

  const response = await notion.pages.update({
    page_id: id,
    properties: {
      View: {
        number: count,
      },
    },
  });

  return response;
};
