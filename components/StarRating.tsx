import { Star, StarHalf } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating">
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star className="w-4 h-4 text-gray-300" key={i} />
        ))}
      </div>
      <div className="stars rating">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;

          const Icon = rating >= starValue ? Star : StarHalf;

          return (
            <Icon
              className={
                rating >= starValue || rating >= starValue - 0.5
                  ? "w-4 h-4 text-yellow-400 fill-yellow-400"
                  : "w-4 h-4 text-gray-300"
              }
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
