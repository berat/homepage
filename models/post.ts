import { Content } from "@/components/base/markdown";

export interface PostType {
  cover: { url: string } | null;
  title: string;
  date: string;
  category: null | string[];
  slug: string;
  like: number;
  view: number;
}

export interface PostDetailType {
  cover: { url: string } | null;
  title: string;
  date: string;
  slug: string;
  like: number;
  view: number;
  category: null | string[];
  content: Content;
}
