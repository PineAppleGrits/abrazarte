"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { BlogCategory } from "@prisma/client";

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string;
  searchQuery: string;
}

export default function CategoryFilter({ categories, selectedCategory, searchQuery }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (categorySlug: string) => {
        const params = new URLSearchParams(searchParams.toString());

    if (categorySlug) {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }

        if (searchQuery) {
      params.set("search", searchQuery);
    }

        params.delete("page");

        startTransition(() => {
      router.replace(`/blog?${params.toString()}`);
          });
  };
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Categorías</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("")}
          disabled={isPending}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCategory === "" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          Todas
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            disabled={isPending}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category.slug ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
