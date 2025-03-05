"use client";

import { useState } from "react";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@prisma/client";

const SKELETON_COUNT = 8;

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="p-4 border rounded shadow animate-pulse bg-gray-100 h-48"></div>
      ))}
    </div>
  );
};

const ClientTestimonialsList = ({ testimonials: initialData = [] }: { testimonials: Testimonial[] }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const take = 8; // Load 8 testimonials per request

  const fetchTestimonials = async (pageToLoad: number) => {
    setLoading(true);
    try {
      const skip = initialData.length + pageToLoad * take;
      const response = await axios.get("/api/testimonials", {
        params: {
          skip,
          take,
        },
      });
      const { testimonials: newTestimonials, hasMore } = response.data;
      setTestimonials((prev) => [...prev, ...newTestimonials]);
      setHasMore(hasMore);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTestimonials(nextPage);
    }
  };

  return (
    <>
      {loading && page === 0 ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}

      {loading && page > 0 && <LoadingSkeleton />}

      {hasMore && (
        <div className="mt-8 text-center">
          <Button onClick={handleLoadMore} disabled={loading}>
            {loading ? "Cargando..." : "Ver más testimonios"}
          </Button>
        </div>
      )}
    </>
  );
};

export default ClientTestimonialsList;
