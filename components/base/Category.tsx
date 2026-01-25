"use client";

import { Locale } from "@/lib/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const defaultCategoryStyle =
  "bg-gray-100 px-3 py-1 rounded-2xl text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition-colors duration-100";

export default function Category({
  locale,
  categories,
}: {
  locale: Locale;
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory =
    searchParams.get("category") || (locale === "tr" ? "hepsi" : "all");

  const allCategory = useMemo(
    () => [locale === "tr" ? "hepsi" : "all"],
    [locale],
  );

  const handleCategoryChange = (category: string) => {
    if (!category) return;

    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-0">
      {Array.isArray(categories) && categories.length > 0 && (
        <div className={"my-4 flex flex-wrap gap-2"}>
          {[...allCategory, ...categories].map(
            (category) =>
              category && (
                <button
                  key={category}
                  className={`${defaultCategoryStyle} ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-lightGray "
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ),
          )}
        </div>
      )}
    </div>
  );
}
