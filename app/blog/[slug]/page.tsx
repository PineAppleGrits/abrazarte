import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import prisma from "@/prisma";
import { BlogPost } from "@/types/common";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!post) {
    notFound();
  }

  let relatedPosts: BlogPost[] = [];

  if (post.categoryId) {
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        NOT: { id: post.id },
        status: "PUBLISHED",
        categoryId: post.categoryId,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { category: true },
    });
  } else if (post.tags && post.tags.trim() !== "") {
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        NOT: { id: post.id },
        status: "PUBLISHED",
        tags: { contains: post.tags },
      },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { category: true },
    });
  }
  if (relatedPosts.length < 1) {
    relatedPosts = await prisma.blogPost.findMany({
      where: {
        NOT: { id: post.id },
        status: "PUBLISHED",
      },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { category: true },
    });
  }

  const prevPost = await prisma.blogPost.findFirst({
    where: {
      status: "PUBLISHED",
      createdAt: { lt: post.updatedAt },
    },
    select: { slug: true },
    orderBy: { createdAt: "desc" },
  });

  const nextPost = await prisma.blogPost.findFirst({
    where: {
      status: "PUBLISHED",
      createdAt: { gt: post.updatedAt },
    },
    select: { slug: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <BlogPostClient
      prevPost={prevPost?.slug}
      nextPost={nextPost?.slug}
      post={post}
      relatedPosts={relatedPosts}
      blogPostsCount={10}
    />
  );
}
