import BlogPostForm, { BlogCategory } from "@/components/blog/BlogPostForm";
import prisma from "@/prisma";


export const metadata = {
  title: "Crear Artículo",
};

async function getCategories(): Promise<BlogCategory[]> {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
  return categories;
}

export default async function CreateBlogPostPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPostForm categories={categories} />
    </div>
  );
}
