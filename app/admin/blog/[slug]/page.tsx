import BlogPostForm, { FormValues, BlogCategory, BlogStatus } from "@/components/blog/BlogPostForm";
import prisma from "@/prisma";
import { redirect } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

async function getCategories(): Promise<BlogCategory[]> {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
  return categories;
}

async function getPost(slug: string): Promise<FormValues | null> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });
  if (!post) return null;
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category.slug,
    featuredImage: post.image,
    author: post.author,
    authorRole: post.authorRole,
    tags: post.tags,
    content: post.content,
    status: post.status as BlogStatus,
  };
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const categories = await getCategories();
  const post = await getPost(params.slug);

  if (!post) redirect("/404");

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPostForm defaultValues={post} categories={categories} />
    </div>
  );
}
