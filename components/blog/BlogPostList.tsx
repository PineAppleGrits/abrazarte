"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCategory, BlogPost } from "@prisma/client";
import BlogPostListCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import { formatDate } from "@/lib/utils";

interface BlogPostsListProps {
  initialPosts: (Omit<BlogPost, "content"> & { category: BlogCategory })[];
  totalCount: number;
  searchQuery: string;
  currentPage: number;
  categories: BlogCategory[];
  selectedCategory: string;
}

export default function BlogPostsList({
  initialPosts,
  totalCount,
  searchQuery,
  currentPage,
  categories,
  selectedCategory,
}: BlogPostsListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading] = useState(false);
  const router = useRouter();

  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, selectedCategory, searchQuery, currentPage]);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  const regularPosts = posts.length > 1 ? posts.slice(1) : [];


  return (
    <>
      {categories.length > 0 && (
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      )}

      {searchQuery && (
        <p className="mb-6 text-gray-600">
          Se encontraron {totalCount} resultados para &quot;{searchQuery}&quot;
        </p>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg">Cargando artículos...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">No se encontraron artículos.</p>
          {searchQuery && <p className="mt-2 text-gray-600">No hay resultados para &quot;{searchQuery}&quot;.</p>}
          {selectedCategory && <p className="mt-2 text-gray-600">No hay artículos en esta categoría.</p>}

          {(searchQuery || selectedCategory) && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                const params = new URLSearchParams();
                if (searchQuery) params.set("search", searchQuery);
                router.replace(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
              }}
            >
              {selectedCategory ? "Ver todas las categorías" : "Limpiar búsqueda"}
            </Button>
          )}
        </div>
      ) : (
        <>
          {featuredPost && currentPage === 1 && !searchQuery && !selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={featuredPost.image || "/placeholder.svg?height=400&width=600"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-2">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category.name}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">{formatDate(featuredPost.createdAt)}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button>Leer artículo completo</Button>
                </Link>
              </div>
            </div>
          )}

          {(regularPosts.length > 0 || (featuredPost && (searchQuery || selectedCategory || currentPage > 1))) && (
            <>
              <h2 className="text-2xl font-bold mb-8">
                {currentPage === 1 && !searchQuery && !selectedCategory ? "Artículos recientes" : "Artículos"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || selectedCategory || currentPage > 1 ? posts : regularPosts).map((post) => (
                  <BlogPostListCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchQuery={searchQuery}
                    categorySlug={selectedCategory}
                  />
                </div>
              )}

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Mostrando {Math.min(currentPage * POSTS_PER_PAGE, totalCount)} de {totalCount} artículos
                </p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
