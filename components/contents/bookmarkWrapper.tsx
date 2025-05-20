"use client";

import { useEffect, useMemo, useState } from "react";
import moment from "moment";

import "moment/locale/tr";

import { BookmarkType } from "@/models/bookmark";

import BookmarkCard from "../cards/bookmark";
import Category from "../filters/category";

interface ClientBlogContentProps {
  initialPosts: BookmarkType[];
  categories: string[];
  isTurkish?: boolean;
}

const BookmarkWrapper: React.FC<ClientBlogContentProps> = ({
  initialPosts = [], // Default değer
  categories = [], // Default değer
  isTurkish = true,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    isTurkish ? "Hepsi" : "All",
  ]);
  const [filteredPosts, setFilteredPosts] =
    useState<BookmarkType[]>(initialPosts);

  useEffect(() => {
    if (!Array.isArray(initialPosts)) return;

    const newFilteredPosts =
      !selectedCategories?.length ||
      selectedCategories.includes(isTurkish ? "Hepsi" : "All")
        ? initialPosts
        : initialPosts.filter((post) =>
            post?.tags && Array.isArray(post.tags)
              ? post.tags.some((cat) => selectedCategories.includes(cat))
              : false,
          );

    setFilteredPosts(newFilteredPosts);
  }, [selectedCategories, initialPosts]);

  const handleCategoryChange = (category: string) => {
    if (!category) return;

    setSelectedCategories([category]);
  };

  const groupedByDate = useMemo(() => {
    if (!Array.isArray(filteredPosts) || !filteredPosts?.length) {
      return {};
    }

    return filteredPosts.reduce(
      (acc: Record<string, BookmarkType[]>, item: BookmarkType) => {
        if (!item?.created) return acc;

        const getMonth = moment(item.created).format("MMMM YYYY");
        if (!acc[getMonth]) {
          acc[getMonth] = [];
        }
        acc[getMonth].push(item);
        return acc;
      },
      {},
    );
  }, [filteredPosts]);

  return (
    <div className="flex gap-4 flex-col pb-2 items-start">
      <div className="flex flex-wrap gap-2 items-center mb-0">
        {Array.isArray(categories) && categories.length > 0 && (
          <Category
            data={categories}
            selectedCategory={selectedCategories || []}
            onCategoryChange={handleCategoryChange}
          />
        )}
      </div>
      <div className="w-full flex gap-4 my-8 flex-wrap items-start">
        {Object.keys(groupedByDate || {}).length > 0 ? (
          Object.keys(groupedByDate).map((key: string) => (
            <ul key={key} className="w-full my-4 block">
              <li key={`header-${key}`}>
                <h3 className="text-xl mb-2 text-slate-400 tracking-wide">
                  {key}
                </h3>
              </li>
              <li key={`content-${key}`}>
                <div className="flex gap-8 flex-wrap">
                  {Array.isArray(groupedByDate[key]) &&
                    groupedByDate[key].map((item: BookmarkType) => (
                      <BookmarkCard
                        key={item?.id || Math.random()}
                        data={item}
                      />
                    ))}
                </div>
              </li>
            </ul>
          ))
        ) : (
          <h3>
            {isTurkish
              ? "Herhangi bir yer imi bulunamadı!"
              : "No bookmarks found!"}
          </h3>
        )}
      </div>
    </div>
  );
};

export default BookmarkWrapper;
