import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

type Props = {
  image?: string;
  title: string;
  caption?: string;
  date?: string;
  isProject?: boolean;
  url?: string;
};

const ListItem: React.FC<Props> = ({
  image,
  title,
  isProject = false,
  caption,
  date,
  url,
}) => {
  const isExternal = useMemo(() => url?.startsWith("http"), [url]);

  const content = (
    <>
      <div className="flex items-center gap-3 ">
        {image && (
          <Image
            src={image}
            alt={title}
            width={23}
            height={23}
            className="rounded-md object-cover"
          />
        )}

        <div
          className={`flex  gap-1  ${
            isProject
              ? "flex-row items-center"
              : "flex-col md:flex-row md:items-center"
          }`}
        >
          <span
            className={`text-xl text-primary font-semibold leading-[1.6] ${
              url ? "group-hover:text-blue-600" : ""
            } ${isExternal && url ? "underline" : ""}`}
          >
            {title}
          </span>

          {caption && (
            <span className="text-lg text-gray font-semibold">
              <span className="hidden md:inline-flex">—</span> {caption}
            </span>
          )}
        </div>
      </div>
      {date && (
        <span className="md:ml-auto text-description text-base font-semibold">
          {date}
        </span>
      )}
    </>
  );

  const className = `flex md:flex-row flex-col gap-1 md:items-center ${
    url ? "group cursor-pointer" : "cursor-default"
  }`;

  if (!url) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
    >
      {content}
    </Link>
  );
};

export default memo(ListItem);
