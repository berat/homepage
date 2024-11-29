"use server";

import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { PostType } from "@/models/post";

import { getBlocks, getPageMetaData } from "@/utils/parser";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const gelAllPublishedPosts = async (length?: number) => {
  const posts: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_ID,
    ...(length ? { page_size: length } : {}),
    filter:
      process.env.NODE_ENV === "production"
        ? {
            property: "Published",
            checkbox: {
              equals: true,
            },
          }
        : undefined,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results as PageObjectResponse[];
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

export const getSinglePost = async (slug: string) => {
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
};

export const getPosts = async (length?: number) => {
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
};
