import Link from "next/link";
import moment from "moment";

import { BookmarkType } from "@/models/bookmark";

interface Props {
  data: BookmarkType;
}

const BookmarkCard: React.FC<Props> = ({ data }) => {
  return (
    <Link
      href={data.link}
      key={data.id}
      target="_blank"
      className={`min-w-[48%] lg:min-w-[225px] relative rounded-lg z-40 hover:opacity-85`}
    >
      <div key={data.id} className="flex items-start gap-4">
        {data.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.cover}
            alt={data.title}
            className="w-52 h-32 min-w-52 rounded-lg object-cover"
          />
        ) : (
          <div className="w-52 h-32 bg-lightGray dark:bg-[#2f313a] rounded-lg" />
        )}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg text-text dark:text-darkText leading-8">
            {data.title}
          </span>
          <p className="text-text dark:text-darkText font-normal">
            {data.excerpt &&
              data.excerpt.split(" ").slice(0, 17).join(" ") +
                (data.excerpt.split(" ").length > 17 ? "..." : "")}
          </p>

          <div className="text-[#737373] text-sm flex items-center gap-1">
            <span>{data.domain}</span>
            <span> • </span>
            <span>{moment(data.created).fromNow()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookmarkCard;
