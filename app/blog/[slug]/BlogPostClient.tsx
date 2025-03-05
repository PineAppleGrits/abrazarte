"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Mail, Calendar, User, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { BlogCategory, BlogPost } from "@prisma/client";
import { formatDate, parseTagsString } from "@/lib/utils";

interface BlogPostClientProps {
  post: BlogPost & { category: BlogCategory };
  nextPost?: string;
  prevPost?: string;
  relatedPosts: (BlogPost & { category: BlogCategory })[];
  blogPostsCount: number;
}

export default function BlogPostClient({ post, nextPost, prevPost, relatedPosts }: BlogPostClientProps) {
  return (
    <>
      <article className="bg-white">
        {/* Header */}
        <div className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-4">
                <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category.name}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{formatDate(post.createdAt)}</span>
                </div>
                {post.author && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span className="text-sm">{post.author}</span>
                  </div>
                )}
                {post.readTime && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{post.readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 md:px-6 -mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Social sharing */}
            <div className="flex justify-end mb-8">
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Facebook className="w-4 h-4 text-primary" />
                </button>
                <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Twitter className="w-4 h-4 text-primary" />
                </button>
                <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-4 h-4 text-primary" />
                </button>
                <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>

            {/* Author info if available */}
            {post.author && post.authorRole && (
              <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt={post.author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">{post.author}</p>
                  <p className="text-gray-600 text-sm">{post.authorRole}</p>
                </div>
              </div>
            )}

            {/* Post content */}
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-bold mb-2">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {parseTagsString(post.tags).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Artículos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.slug} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-48">
                    <Image src={relatedPost.image || "/placeholder.svg"} alt={relatedPost.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {relatedPost.category.name}
                      </span>
                      <span className="text-gray-500 text-xs ml-2">{formatDate(relatedPost.updatedAt)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                    <Link href={`/blog/${relatedPost.slug}`} className="text-primary font-medium hover:underline">
                      Leer más
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Post navigation */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto flex justify-between">
          <Link href="/blog" className="flex items-center text-primary hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a Notas de Interés
          </Link>

          <div className="flex gap-4">
            {/* Example previous/next links if available */}
            {prevPost && (
              <Link href={`/blog/${prevPost}`} className="flex items-center text-primary hover:underline">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Artículo anterior
              </Link>
            )}

            {nextPost && (
              <Link href={`/blog/${nextPost}}`} className="flex items-center text-primary hover:underline">
                Artículo siguiente
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Necesitas ayuda para encontrar la residencia ideal?</h2>
            <p className="text-lg text-gray-700 mb-8">
              En Find Care te ayudamos a encontrar la residencia geriátrica que mejor se adapte a las necesidades de tu ser
              querido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/buscar-geriatrico">
                <Button size="lg" className="w-full sm:w-auto">
                  Buscar geriátrico
                </Button>
              </Link>
              <Link href="/contacto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contactar con un asesor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
