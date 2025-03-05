import { calculateReadTime } from "@/lib/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, excerpt, category, featuredImage, author, authorRole, tags, content, status } = body;

    if (!id) {
      return NextResponse.json({ error: "ID del artículo es requerido" }, { status: 400 });
    }

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
    }

    let categoryId = existingPost.categoryId;
    if (category && category !== existingPost.category) {
      const foundCategory = await prisma.blogCategory.findUnique({
        where: { slug: category },
      });

      if (!foundCategory) {
        return NextResponse.json({ error: "Categoría no encontrada" }, { status: 400 });
      }
      categoryId = foundCategory.id;
    }

    let newSlug = existingPost.slug;
    if (title && title !== existingPost.title) {
      const slugFromTitle = slugify(title, { lower: true });
      const exists = await prisma.blogPost.findFirst({
        where: {
          slug: slugFromTitle,
          id: { not: id },
        },
      });

      newSlug = exists ? `${slugFromTitle}-${Date.now()}` : slugFromTitle;
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title || existingPost.title,
        slug: newSlug,
        excerpt: excerpt || existingPost.excerpt,
        author: author || existingPost.author,
        authorRole: authorRole || existingPost.authorRole,
        tags: tags || existingPost.tags,
        readTime: content ? calculateReadTime(content) : existingPost.readTime,
        image: featuredImage || existingPost.image,
        content: content || existingPost.content,
        status: status || existingPost.status,
        categoryId: categoryId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Error al actualizar el artículo" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting the post" }, { status: 500 });
  }
}
