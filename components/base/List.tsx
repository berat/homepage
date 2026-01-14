import Image from "next/image";
import { memo, useMemo } from "react";

type Props = {
  image?: string;
  title: string;
  caption: string;
  date?: string;
  url?: string;
};

const ListItem: React.FC<Props> = ({ image, title, caption, date, url }) => {
  const isExternal = useMemo(() => url?.startsWith("http"), [url]);

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex gap-3 items-center ${url ? 'group' : ''}`}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            width={23}
            height={23}
            className="rounded-md object-cover"
          />
        )}
        <div className="flex gap-2 items-center">
          <span
            className={`text-xl text-primary font-semibold group-hover:text-blue-600 ${
              isExternal ? "underline" : ""
            }`}
          >
            {title}
          </span>
          <span className="text-lg font-semibold text-caption">{caption}</span>
        </div>
        {date && (
          <span className="ml-auto text-description text-base font-semibold">
            {date}
          </span>
        )}
      </a>
    </li>
  );
};

export default memo(ListItem);
