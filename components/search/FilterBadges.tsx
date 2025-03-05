import { Badge } from "@/components/ui/badge";
import { SearchFilters } from "@/types/common";
import { X } from "lucide-react";


interface FilterBadgesProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
}

export function FilterBadges({
  filters,
  setFilters,
  applyFilters,
}: FilterBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Búsqueda: {filters.searchQuery}
          <X
            className="h-3 w-3 cursor-pointer hover:text-destructive"
            onClick={() => {
              setFilters({ ...filters, searchQuery: "" });
              applyFilters();
            }}
          />
        </Badge>
      )}
      {filters.city && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Ubicación: {filters.city}
          <X
            className="h-3 w-3 cursor-pointer hover:text-destructive"
            onClick={() => {
              setFilters({ ...filters, city: undefined });
              applyFilters();
            }}
          />
        </Badge>
      )}
      {/* Additional badges for other filters could be added here */}
    </div>
  );
}
