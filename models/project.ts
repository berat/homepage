import { Content } from "@/components/base/markdown";

export interface ProjectType {
  cover: { url: string } | null;
  title: string;
  date: string;
  slug: string;
  like: number;
  view: number;
  status: string;
  source?: string;
  demo?: string;
  summary: string;
}
export interface ProjectDetailType {
  cover: { url: string } | null;
  title: string;
  date: string;
  slug: string;
  like: number;
  view: number;
  status: string;
  source?: string;
  demo?: string;
  summary: string;
  content: Content;
}
