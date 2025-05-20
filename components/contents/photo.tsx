import { PhotoType } from "@/models/photo";

import { getPhotos } from "@/actions/photos";
import { updateViewAndLike } from "@/actions/viewLike";

import PhotoCard from "../cards/photo";

const PhotoContent = async ({ isTurkish = true }: { isTurkish?: boolean }) => {
  const photoData = await getPhotos();
  await updateViewAndLike("page", isTurkish ? "" : "en/" + "photos", "views");

  return (
    <div className={"w-full flex gap-4 my-8 flex-wrap items-start "}>
      {photoData.map((post: PhotoType) => (
        <PhotoCard key={post.id} data={post} isPage />
      ))}
    </div>
  );
};

export default PhotoContent;
