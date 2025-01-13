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
}

type GroupedData = Record<string, PostType[]>;

const BlogWrapper: React.FC<ClientBlogContentProps> = ({
  initialPosts,
  categories,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(initialPosts);
  const [visible, setVisible] = useState<boolean>(false);

  const handleCategoryChange = (category: string) => {
    if (category === "Hepsi") {
      const updatedCategories = selectedCategories.includes(category)
        ? []
        : [category];

      setSelectedCategories(updatedCategories);

      setFilteredPosts(initialPosts);
    } else {
      let updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

      if (selectedCategories.includes("Hepsi")) {
        updatedCategories = updatedCategories.filter((c) => c !== "Hepsi");
      }
      setSelectedCategories(updatedCategories);

      // Filter posts based on selected categories
      const newFilteredPosts =
        updatedCategories.length === 0
          ? initialPosts
          : initialPosts.filter((post) =>
              post.category?.some((cat) => updatedCategories.includes(cat)),
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
                  <PostCard key={post.slug} post={post} isPage />
                ))}
              </div>
            </ul>
          ))
      ) : (
        <h3>Herhangi bir yazı bulunamadı!</h3>
      )}
    </div>
  );
};

export default BlogWrapper;
