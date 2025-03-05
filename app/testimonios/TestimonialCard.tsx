import { Testimonial } from "@prisma/client";
import Image from "next/image";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
          <Image src={"/placeholder.svg"} alt={"Image"} width={48} height={48} className="object-cover" />
        </div>
        <div>
          <p className="font-bold">{"Juan"}</p>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
      <div className="flex text-yellow-400 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
      <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
    </div>
  );
}
