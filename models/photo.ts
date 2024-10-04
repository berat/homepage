export interface PhotoType {
  id: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  alt_description: string;
  user: User;
  current_user_collections: Collection[];
  urls: Urls;
  links: Links;
}

interface User {
  id: string;
  username: string;
  name: string;
  portfolio_url: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
}

interface Links {
  html: string;
}

interface Collection {
  id: number;
  title: string;
  published_at: string;
}

interface Urls {
  raw: string;
  regular: string;
}
