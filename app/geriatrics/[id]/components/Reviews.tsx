import { Card } from "@/components/ui/card";
import type { Review } from "@prisma/client";
import ReviewComponent from "./Review";

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Reseñas ({reviews.length})</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </div>
    </Card>
  );
}
