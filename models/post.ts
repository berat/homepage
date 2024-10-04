export interface PostType {
  id: string;
  cover?: string | null;
  title: string;
  category: string[] | null;
  date: string;
  slug: string;
  like: number;
  view: number;
}

export interface PostDetailType {
  post: PostType;
  content: any; 
}
