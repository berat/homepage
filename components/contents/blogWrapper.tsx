"use client";

import { useMemo, useState } from "react";
import moment from "moment";

import { PostType } from "@/models/post";

import { PostCard } from "../cards";
import Category from "../filters/category";
import Search from "../filters/search";

interface ClientBlogContentProps {
  initialPosts: PostType[];
  categories: string[];
  isTurkish?: boolean;
}

type GroupedData = Record<string, PostType[]>;

const BlogWrapper: React.FC<ClientBlogContentProps> = ({
  initialPosts,
  categories,
  isTurkish = true,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    isTurkish ? "Hepsi" : "All",
  ]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(initialPosts);
  const [visible, setVisible] = useState<boolean>(false);

  const handleCategoryChange = (category: string) => {
    setVisible(false);
    if (category === (isTurkish ? "Hepsi" : "All")) {
      setSelectedCategories([category]);

      setFilteredPosts(initialPosts);
    } else {
      setSelectedCategories([category]);

      // Filter posts based on selected categories
      const newFilteredPosts = initialPosts.filter((post) =>
        post.category?.some((cat) => [category].includes(cat)),
      );

      setFilteredPosts(newFilteredPosts);
    }
  };

  // Arama handler'ı
  const handleSearch = (query: string) => {
    const searchQuery = query.toLowerCase().trim();
    setSelectedCategories([]);

    const newFilteredPosts =
      searchQuery.length === 0
        ? initialPosts
        : initialPosts.filter((post) => {
            const matchesSearch =
              !searchQuery || post.title.toLowerCase().includes(searchQuery);

            return matchesSearch;
          });

    setFilteredPosts(newFilteredPosts);
  };

  const groupedData = useMemo(
    () =>
      filteredPosts.reduce((acc: GroupedData, item: PostType) => {
        const date = moment(item.date).year();
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
      }, {}),
    [filteredPosts],
  );

  return (
    <div className="flex gap-4 flex-col pb-2 items-start">
      <div
        className={`flex flex-wrap gap-2 items-center ${visible ? "mb-10" : "mb-0"}`}
      >
        <Search
          visible={visible}
          toggleSearch={setVisible}
          onSearch={handleSearch}
          isTurkish={false}
        />
        <Category
          data={categories}
          selectedCategory={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      {Object.keys(groupedData).length !== 0 ? (
        Object.keys(groupedData)
          .sort((a: string, b: string) => Number(b) - Number(a))
          .map((key: string) => (
            <ul key={key} className="w-full my-4 block">
              <h3 className="text-xl mb-2 text-slate-400 tracking-wide">
                {key}
              </h3>
              <div className={"flex gap-4 flex-wrap"}>
                {groupedData[key].map((post: PostType) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    isPage
                    isTurkish={isTurkish}
                  />
                ))}
              </div>
            </ul>
          ))
      ) : (
        <h3 className="dark:text-darkText">
          {isTurkish ? "Herhangi bir yazı bulunamadı!" : "No posts found!"}
        </h3>
      )}
    </div>
  );
};

export default BlogWrapper;
