import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Review } from "@prisma/client";
import { Star } from "lucide-react";

export default function ReviewComponent({ review }: { review: Review }) {
  return (
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
          <div className="mt-2 text-sm text-gray-500">{formatDate(review.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
