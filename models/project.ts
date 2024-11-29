export interface ProjectType {
  id: string;
  cover?: string | null;
  title: string;
  category: string[] | null;
  source?: string,
  demo?: string,
  summary: string;
  status: string;
  slug: string;
  like: number;
  view: number;
}

export interface ProjectDetailType {
  post: ProjectType;
  content: any;
}
