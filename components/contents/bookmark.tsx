import { getBookmarks } from "@/actions/bookmark";
import { updateViewAndLike } from "@/actions/viewLike";

import BookmarkWrapper from "./bookmarkWrapper";

const BookmarkContent = async ({
  isTurkish = true,
}: {
  isTurkish?: boolean;
}) => {
  const { data, categories } = await getBookmarks();
  await updateViewAndLike(
    "page",
    isTurkish ? "" : "en/" + "bookmarks",
    "views",
  );

  if (!data) return null;

  return (
    <BookmarkWrapper
      categories={categories}
      initialPosts={data}
      isTurkish={isTurkish}
    />
  );
};

export default BookmarkContent;
