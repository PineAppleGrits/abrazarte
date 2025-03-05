import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { calculateReadTime } from "@/lib/utils";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, category, featuredImage, author, authorRole, tags, content, status } = body;

    const foundCategory = await prisma.blogCategory.findUnique({
      where: { slug: category },
    });

    if (!foundCategory) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 400 });
    }
    const exists =
      (await prisma.blogPost.count({
        where: { slug: slugify(title, { lower: true }) },
      })) > 0;
    
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        slug: slugify(`${title}${exists ? "-" + Date.now() : ""}`, { lower: true }),
        excerpt,
        author,
        authorRole,
        tags,
        readTime: calculateReadTime(content),
        image: featuredImage,
        content,
        status: status,
        category: { connect: { id: foundCategory.id } },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error al crear el artículo" }, { status: 500 });
  }
}



const POSTS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const categorySlug = searchParams.get("category") || "";
    const adminRequest = searchParams.get("admin") || "";

    const skip = (page - 1) * POSTS_PER_PAGE;

    const isAdmin = request.headers.get("Authorization");
    const where: Prisma.BlogPostWhereInput = adminRequest && isAdmin ? {} : { status: "PUBLISHED" };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { excerpt: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { content: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { author: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { tags: { contains: search, mode: Prisma.QueryMode.insensitive } },
        {
          category: {
            name: { contains: search, mode: Prisma.QueryMode.insensitive },
          },
        },
      ];
    }

    
    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    
    const totalCount = await prisma.blogPost.count({ where });
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    
    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: POSTS_PER_PAGE,
      skip,
    });

    
    const categories = await prisma.blogCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      posts,
      totalCount,
      totalPages,
      currentPage: page,
      categories,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
