// models
import { PhotoType } from "@/models/photo";
// actions
import { getPhotos } from "@/actions/photos";
// components
import PhotoCard from "../cards/photo";

const PhotoContent = async () => {
  const photoData = await getPhotos();

  return (
    <div className={"w-full flex gap-4 my-8 flex-wrap items-start "}>
      {photoData.map((post: PhotoType) => (
        <PhotoCard key={post.id} data={post} isPage />
      ))}
    </div>
  );
};

export default PhotoContent;
