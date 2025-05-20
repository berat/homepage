"use server";

import { PhotoType } from "@/models/photo";
import { PostType } from "@/models/post";
import { ProjectType } from "@/models/project";

import { getPhotos } from "@/actions/photos";
import { getAllPosts } from "@/actions/post";
import { getAllProjects } from "@/actions/project";

import PhotoCard from "../cards/photo";
import PostCard from "../cards/post";
import ProjectCard from "../cards/project";

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

export const PostSection = async ({
  isTurkish = true,
}: {
  isTurkish?: boolean;
}) => {
  const { posts: allPosts } = await getAllPosts(6, false, isTurkish);

  return (
    <div
      className={"flex gap-4 pb-2 items-center snap-proximity overflow-x-auto"}
    >
      {allPosts.map((post: PostType) => (
        <PostCard key={post.slug} post={post} isTurkish={isTurkish} />
      ))}
    </div>
  );
};

export const ProjectSection = async ({
  isTurkish = true,
}: {
  isTurkish?: boolean;
}) => {
  const data = await getAllProjects(6, false, isTurkish);

  return (
    <div
      className={"flex gap-8 pb-2 items-start snap-proximity overflow-x-auto"}
    >
      {data?.map((post: ProjectType) => (
        <ProjectCard key={post.slug} post={post} isHome />
      ))}
    </div>
  );
};
