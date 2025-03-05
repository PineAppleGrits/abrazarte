import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Review } from "@prisma/client";

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Reseñas ({reviews.length})</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start gap-4">
              <Avatar>{/* Add user avatar */}</Avatar>
              <div>
                <div className="flex items-center gap-2">
                  {/* <span className="font-medium">{review.user?.name || "Usuario"}</span> */}
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">{review.rating}</span>
                  </div>
                </div>
                {review.comment && <p className="mt-2 text-gray-600">{review.comment}</p>}
                <div className="mt-2 text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
