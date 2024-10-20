"use server";

import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";
// models
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostType } from "@/models/post";
// utils
import { getRandomInt } from "@/utils/helpers";
import { getPageMetaData } from "@/utils/parser";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const gelAllPublishedPosts = async (length?: number) => {
  const posts: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  const allPosts = posts.results as PageObjectResponse[];


  if (length) {
    const data = allPosts.slice(0, length).map((post: PageObjectResponse) => {
      return getPageMetaData(post);
    });

    return { data };
  }
  const allCategories: string[] = [];

  const resultPost: PostType[] = allPosts.map((post: PageObjectResponse) => {
    const formattedPost = getPageMetaData(post) as PostType;
    formattedPost.category.map((category: string) => {
      allCategories.push(category);
    });

    return formattedPost;
  });

  return { data: resultPost, categories: new Set(allCategories) };
};

export const getBlocks = unstable_cache(
  async (blockID) => {
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
      }, [])
    );
  },
  [],
  {
    revalidate: 900, // 1 day,
  }
);

export const getSinglePost = unstable_cache(
  async (slug: string) => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_ID,
      filter: {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    const page = response.results[0] as PageObjectResponse;
    const metadata = getPageMetaData(page);

    if (!metadata) {
      return false;
    }
    const content = await getBlocks(page.id);

    return {
      post: metadata,
      content: content,
    };
  },
  [],
  {
    revalidate: 900, // 1 hour,
  }
);

export const likedPost = unstable_cache(
  async (id: string, count: number) => {
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        Like: {
          number: count,
        },
      },
    });

    return response;
  },
  [],
  {
    revalidate: 3600, // 1 day,
  }
);

export const updateViewPost = unstable_cache(
  async (id: string, count: number) => {
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        View: {
          number: count,
        },
      },
    });

    return response;
  },
  [],
  {
    revalidate: 900, // 15m
  }
);

export const getPosts = unstable_cache(
  async (length?: number) => {
    const response = await gelAllPublishedPosts(length);

    if (length) {
      return {
        data: response.data as PostType[],
      };
    } else {
      return {
        data: response.data as PostType[],
        // @ts-ignore
        categories: ["Hepsi", ...response.categories] as string[],
      };
    }
  },
  [],
  {
    revalidate: 900, // 1hour
  }
);
