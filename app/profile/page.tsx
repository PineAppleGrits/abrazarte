import React from "react";
import { auth } from "@/auth";
import prisma from "@/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import GeriatricCard from "@/components/GeriatricCard";

export const metadata = {
  title: "User Profile",
  description: "Display user information using shadcn UI",
};

export const dynamic = "force-dynamic"

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      favorites: {
        include: {
          geriatric: {
            include: {
              images: true,
              reviews: true,
            },
          },
        },
      },
      testimonial: true,
      Review: {
        include: {
          geriatric: true,
        },
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const { name, email, favorites, testimonial, Review } = user;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
          <p>
            <span className="font-semibold">Name: </span>
            {name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {email || "N/A"}
          </p>
        </div>

        {testimonial && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Testimonial</h2>
            <p>
              <span className="font-semibold">Quote: </span>
              {testimonial.quote}
            </p>
            <p>
              <span className="font-semibold">Location: </span>
              {testimonial.location}
            </p>
            <p>
              <span className="font-semibold">Rating: </span>
              {testimonial.rating}
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Favorites</h2>
          {favorites.length === 0 ? (
            <p>No favorites found.</p>
          ) : (
            <ul className="space-y-3">
              {favorites.map(({ geriatric }) => (
                <GeriatricCard
                  initialIsFavorite={true}
                  geriatric={{
                    ...geriatric,
                    images: geriatric.images.map((e) => e.url),
                  }}
                  key={geriatric.id}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          {Review.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <div className="space-y-4">
              {Review.map((review) => {
                // Convert the 1-10 rating to a 1-5 star rating
                const starRating = Math.round(review.rating / 2);
                return (
                  <Card key={review.id}>
                    <CardHeader>
                      <CardTitle>
                        <div className="flex justify-between items-center">
                          {review.geriatric?.name || "N/A"}
                          <Link
                            className={buttonVariants({
                              variant: "outline",
                            })}
                            href={`/geriatric/${review.geriatric.id}`}
                          >
                            Ver mas
                          </Link>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">Rating: </span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className={`h-4 w-4 ${idx < starRating ? "text-yellow-500" : "text-gray-300"}`} />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      {review.comment && <p className="text-gray-700">{review.comment}</p>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
