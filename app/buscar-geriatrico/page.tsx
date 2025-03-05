"use client";
import { Card } from "@/components/ui/card";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SearchBox } from "@/components/search/SearchBox";
import { FilterBadges } from "@/components/search/FilterBadges";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { GeriatricsList } from "@/components/search/GeriatricsList";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { fetchGeriatrics, addToFavorites } from "@/services/geriatricServices";

export default function BuscarGeriatrico() {
  const queryClient = useQueryClient();

  const { filters, setFilters, tempPriceRange, setTempPriceRange, applyFilters, resetFilters } = useSearchFilters();

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["geriatrics", filters],
    queryFn: ({ pageParam }) => fetchGeriatrics({ filters, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined),
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
  });

  // Mutation for adding to favorites
  const favoritesMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleAddToFavorites = (geriatricId: string) => {
    favoritesMutation.mutate(geriatricId);
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          tempPriceRange={tempPriceRange}
          setTempPriceRange={setTempPriceRange}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      </div>

      <div className="md:col-span-3">
        <Card className="mb-6">
          <div className="p-4">
            <SearchBox filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
            <FilterBadges filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
          </div>
        </Card>

        <GeriatricsList
          infiniteQuery={infiniteQuery}
          handleAddToFavorites={handleAddToFavorites}
          favoritesMutation={favoritesMutation}
        />
      </div>
    </div>
  );
}
