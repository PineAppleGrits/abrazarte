import { useInView } from "react-intersection-observer";
import { InfiniteData, UseInfiniteQueryResult, UseMutationResult } from "@tanstack/react-query";
import { GeriatricSearchResult } from "@/types/common";
import { SearchResult } from "@/types/common";
import GeriatricCard from "@/components/GeriatricCard";

interface GeriatricsListProps {
  infiniteQuery: UseInfiniteQueryResult<InfiniteData<SearchResult>, Error>;
  handleAddToFavorites: (geriatricId: string) => void;
  favoritesMutation: UseMutationResult<unknown, Error, string>;
}

export function GeriatricsList({ infiniteQuery, handleAddToFavorites, favoritesMutation }: GeriatricsListProps) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 300px 0px",
  });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  const totalItems = data?.pages[0]?.pagination.total || 0;

  const allGeriatrics = data?.pages.flatMap((page) => page.geriatrics) || [];

  const secondaryResults = data?.pages[0]?.secondaryResults || [];

  if (isLoading && !isFetchingNextPage) {
    return (
      <>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Buscando...</h2>
        </div>
        <div className="flex flex-col justify-center gap-2 items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800">
        Hubo un error al buscar geriátricos. Por favor intenta nuevamente.
      </div>
    );
  }

  if (allGeriatrics.length === 0) {
    return (
      <div className="bg-gray-50 px-8 py-2 rounded-lg text-center">
        <h3 className="text-lg font-medium mb-2">No se encontraron geriátricos</h3>
        <p className="text-gray-600">Prueba con otros filtros o amplía tu búsqueda</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold">{totalItems} Geriátricos Encontrados</h2>
      </div>

      <div className="space-y-6">
        {allGeriatrics.map((geriatric: GeriatricSearchResult) => (
          <GeriatricCard
            key={geriatric.id}
            geriatric={geriatric}
            handleAddToFavorites={handleAddToFavorites}
            favoritesMutation={favoritesMutation}
          />
        ))}
      </div>

      {/* Loading indicator for next page */}
      <div ref={ref} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        ) : hasNextPage ? (
          <p className="text-sm text-muted-foreground">Cargando más resultados...</p>
        ) : null}
      </div>

      {/* Secondary results section */}
      {secondaryResults.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200 space-y-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold">Resultados fuera de tu búsqueda</h3>
          </div>
          {secondaryResults.map((geriatric: GeriatricSearchResult) => (
            <GeriatricCard
              key={geriatric.id}
              geriatric={geriatric}
              handleAddToFavorites={handleAddToFavorites}
              favoritesMutation={favoritesMutation}
            />
          ))}
        </div>
      )}
    </>
  );
}
