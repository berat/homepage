"use server"
// models
import { PhotoType } from "@/models/photo";
import { PostType } from "@/models/post";
// actions
import { getPhotos } from "@/actions/photos";
import { getPosts } from "@/actions/post";
// components
import PhotoCard from "../cards/photo";
import PostCard from "../cards/post";

export const PhotoSection = async () => {
  const photoData = await getPhotos(6);
  return (
    <div
      className={"flex gap-4 pb-2 items-start snap-proximity overflow-x-auto"}
    >
      {photoData.map((photo: PhotoType) => (
        <PhotoCard key={photo.id} data={photo} />
      ))}
    </div>
  );
};

export const PostSection = async () => {
  const postData = await getPosts(6);

  return (
    <div
      className={"flex gap-4 pb-2 items-center snap-proximity overflow-x-auto"}
    >
      {postData.data.map((post: PostType) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
