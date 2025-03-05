
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma";
import BlogPostsList from "@/components/blog/BlogPostList";
import SearchForm from "@/components/blog/SearchForm";
import { Prisma } from "@prisma/client";

interface BlogPageProps {
  searchParams: {
    search?: string;
    page?: string;
    category?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const categorySlug = searchParams?.category || "";

  
  const where: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",
  };

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

  
  const initialPosts = await prisma.blogPost.findMany({
    where,
    omit: {
      content: true,
    },
    include: {
      category: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * 10,
  });

  
  
  const categories = await prisma.blogCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Notas de Interés</h1>
            <p className="text-lg text-gray-700">
              Artículos, consejos y recursos para ayudarte a tomar las mejores decisiones sobre el cuidado de adultos mayores.
            </p>

            <div className="mt-8 max-w-md mx-auto">
              <SearchForm initialSearch={search} />
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<div className="text-center py-12">Cargando artículos...</div>}>
            <BlogPostsList
              initialPosts={initialPosts}
              totalCount={totalCount}
              searchQuery={search}
              currentPage={page}
              categories={categories}
              selectedCategory={categorySlug}
            />
          </Suspense>
        </div>
      </section>

      {/* Your additional sections (FAQ, Contact, etc.) remain unchanged */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Preguntas frecuentes</h2>
            <p className="text-lg text-gray-700 mb-12">
              Respuestas a las dudas más comunes sobre el cuidado de adultos mayores y residencias geriátricas.
            </p>

            <div className="space-y-6 text-left">
              {/* FAQ item */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">
                  ¿Cuándo es el momento adecuado para considerar una residencia geriátrica?
                </h3>
                <p className="text-gray-700">
                  El momento adecuado varía según cada situación, pero algunos indicadores incluyen: dificultades para realizar
                  actividades básicas diarias, problemas de salud que requieren atención constante, aislamiento social, riesgos de
                  seguridad en el hogar o cuando el cuidador familiar experimenta agotamiento.
                </p>
              </div>
              {/* Additional FAQ items here */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/5 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoramiento personalizado?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Nuestro equipo de especialistas está disponible para responder tus preguntas y ayudarte a encontrar la mejor
                  solución para tu ser querido.
                </p>
                <Link href="/contacto">
                  <Button size="lg">Contactar ahora</Button>
                </Link>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Asesoramiento+Personalizado"
                  alt="Asesoramiento personalizado"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
