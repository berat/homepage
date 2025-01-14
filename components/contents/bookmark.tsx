import { getBookmarks } from "@/actions/bookmark";
import { updateViewAndLike } from "@/actions/viewLike";

import BookmarkWrapper from "./bookmarkWrapper";

const BookmarkContent = async () => {
  const { data, categories } = await getBookmarks();
  await updateViewAndLike("page", "bookmarks", "views");

  if (!data) return null;

  return <BookmarkWrapper categories={categories} initialPosts={data} />;
};

export default BookmarkContent;
