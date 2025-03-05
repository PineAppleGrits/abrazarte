import Link from "next/link";
import Image from "next/image";
import { BlogCategory, BlogPost } from "@/types/common";
import { formatDate } from "@/lib/utils";

export default function BlogListCard({ post }: { post: Omit<BlogPost, "content"> & { category: BlogCategory } }) {
  return (
    <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <Image src={post.image || "/placeholder.svg?height=200&width=400"} alt={post.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {post.category.name}
          </span>
          {}
          <span className="text-gray-500 text-xs ml-2">{formatDate(post.createdAt)}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="text-primary font-medium hover:underline">
          Leer más
        </Link>
      </div>
    </div>
  );
}
