import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

import { ProjectType } from "@/models/project";

import { getBlocks, getPageMetaData } from "@/utils/parser";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const gelAllProjects = async (length?: number) => {
  const projects: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT_ID,
    page_size: length || undefined,
  });
  const allProjects = projects.results as PageObjectResponse[];
  const allCategories: string[] = [];

  const resultPost: ProjectType[] = allProjects.map(
    (post: PageObjectResponse) => {
      const formattedPost = getPageMetaData(post) as unknown as ProjectType;
      formattedPost.category.map((category: string) => {
        allCategories.push(category);
      });

      return formattedPost;
    },
  );

  return { data: resultPost, categories: new Set(allCategories) };
};

export const getSingleProject = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT_ID,
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

export const getProject = async (length?: number) => {
  const response = await gelAllProjects(length);

  if (length) {
    return {
      data: response.data as ProjectType[],
    };
  } else {
    return {
      data: response.data as ProjectType[],
      // @ts-ignore
      type: ["Hepsi", ...response.categories] as string[],
    };
  }
};
