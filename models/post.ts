import { Content } from "@/components/base/markdown";

export interface PostType {
  cover: { url: string } | null;
  title: string;
  date: string;
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
  content: Content;
}
