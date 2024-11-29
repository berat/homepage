import Link from "next/link";

import { PhotoType } from "@/models/photo";

import Image from "../base/image";

interface Props {
  isPage?: boolean;
  data: PhotoType;
}

const PhotoCard: React.FC<Props> = ({ data, isPage }) => {
  if (isPage) {
    return (
      <Link
        href={data.links.html}
        target="_blank"
        className="w-[47%] lg:w-[31%] xl:min-w-[275px] relative rounded-lg"
      >
        <Image
          src={data.urls.regular}
          alt={data.alt_description ?? ""}
          rounded="lg"
          width={900}
          height={800}
          className={`w-full xl::w-[340px] h-auto rounded-lg`}
        />
      </Link>
    );
  }
  return (
    <Link
      href={"/photos"}
      className={`min-w-[48%] lg:min-w-[225px] relative rounded-lg z-40`}
    >
      <div
        className={
          "absolute w-full h-full rounded-lg bg-black opacity-20  hover:opacity-0"
        }
      />
      <Image
        src={data.urls.regular}
        alt={data.alt_description ?? ""}
        rounded="lg"
        width={900}
        height={800}
        className={`w-full h-auto rounded-lg`}
      />
    </Link>
  );
};

export default PhotoCard;
