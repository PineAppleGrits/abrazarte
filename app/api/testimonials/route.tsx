import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "8", 10);

  const testimonials = await prisma.testimonial.findMany({
    skip,
    take: take + 1,
    orderBy: {
      id: "asc",
    },
  });

  const hasMore = testimonials.length > take;
  const responseTestimonials = hasMore ? testimonials.slice(0, take) : testimonials;

  return NextResponse.json({
    testimonials: responseTestimonials,
    hasMore,
  });
}
