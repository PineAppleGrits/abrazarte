"use client"

import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { SearchBox } from "@/components/search/SearchBox"
import { FilterBadges } from "@/components/search/FilterBadges"
import { FilterSidebar } from "@/components/search/FilterSidebar"
import { GeriatricsList } from "@/components/search/GeriatricsList"
import { useSearchFilters } from "@/hooks/useSearchFilters"
import { fetchGeriatrics, addToFavorites } from "@/services/geriatricServices"
import { NoResultsFound } from "@/components/search/NoResultsFound"

export default function BuscarGeriatrico() {
  const queryClient = useQueryClient()
  const { filters, setFilters, tempPriceRange, setTempPriceRange, applyFilters, resetFilters } = useSearchFilters()

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["geriatrics", filters],
    queryFn: ({ pageParam }) => fetchGeriatrics({ filters, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const favoritesMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })

  const handleAddToFavorites = (geriatricId: string) => {
    favoritesMutation.mutate(geriatricId)
  }

  const hasNoResults =
    !infiniteQuery.isLoading &&
    infiniteQuery.data?.pages[0]?.geriatrics.length === 0 &&
    infiniteQuery.data?.pages[0]?.secondaryResults.length === 0

  return (
    <>
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
            <Suspense fallback={<p>Loading search...</p>}>
              <SearchBox filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
              <FilterBadges filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
            </Suspense>
          </div>
        </Card>

        <Suspense fallback={<p>Loading geriatrics list...</p>}>
          {hasNoResults ? (
            <NoResultsFound
              searchQuery={filters.searchQuery}
              locations={filters.locations}
              resetFilters={resetFilters}
            />
          ) : (
            <GeriatricsList
              infiniteQuery={infiniteQuery}
              handleAddToFavorites={handleAddToFavorites}
              favoritesMutation={favoritesMutation}
            />
          )}
        </Suspense>
      </div>
    </>
  )
}

