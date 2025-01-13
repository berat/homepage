import React from "react";

interface Props {
  data: string[];
  selectedCategory: undefined | null | string[];
  onCategoryChange: (category: string) => void;
}

const defaultCategoryStyle =
  "bg-lightGray px-3 py-1 rounded-2xl text-sm font-medium";

const Category: React.FC<Props> = ({
  data,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className={"my-4 flex gap-2"}>
      {data.map((category, index) => (
        <button
          key={index}
          className={`${defaultCategoryStyle} ${
            selectedCategory?.includes(category)
              ? "bg-primary text-white"
              : "bg-lightGray"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default React.memo(Category);
