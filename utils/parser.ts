// models
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { PostType } from "@/models/post";
// utils
import { getCategory, defaultDateFormat } from "./helpers";

export const getPageMetaData = (post: PageObjectResponse): PostType | false => {
  const properties = post?.properties as PageObjectResponse["properties"];

  if (!properties) return false;

  return {
    id: post.id,
    cover: post.cover?.type ? post.cover[post.cover.type].url : null,
    title: (properties.Name as any).title[0].plain_text,
    category: getCategory((properties.Category as any).multi_select),
    date: defaultDateFormat((properties.Date as any).date.start),
    slug: (properties.Slug as any).rich_text[0].plain_text,
    like: (properties.Like as any).number,
    view: (properties.View as any).number,
  };
};
