import { BookmarkType } from "@/models/bookmark";

import { getBookmarks } from "@/actions/bookmark";

import BookmarkCard from "../cards/bookmark";
import { updateViewAndLike } from "@/actions/viewLike";

const BookmarkContent = async () => {
  const { data } = await getBookmarks();
  await updateViewAndLike("page", "bookmarks", "views");

  if (!data) return null;

  return (
    <div className={"w-full flex gap-4 my-8 flex-wrap items-start "}>
      {Object.keys(data).map((key: string) => (
        <ul key={key} className="w-full my-4 block">
          <h3 className="text-xl mb-2 text-slate-400 tracking-wide">{key}</h3>
          <div className={"flex gap-8 flex-wrap"}>
            {data[key].map((item: BookmarkType) => (
              <BookmarkCard key={item.id} data={item} />
            ))}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default BookmarkContent;
