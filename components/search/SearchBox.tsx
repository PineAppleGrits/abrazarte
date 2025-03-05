import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GooglePlacesSearch, Place } from "@/components/GooglePlacesSearch";
import { SearchFilters } from "@/types/common";

interface SearchBoxProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
}

export function SearchBox({ filters, setFilters, applyFilters }: SearchBoxProps) {
  function handlePlaceChange(place: Place): void {
    setFilters({
      ...filters,
      city: place.city,
      province: place.province,
      country: place.country,
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, servicios o características..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="pl-9 w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyFilters();
              }
            }}
          />
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="flex items-center gap-2 min-w-fit">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <GooglePlacesSearch onPlaceSelect={handlePlaceChange} />
      </div>
      <Button className="md:w-auto" onClick={applyFilters} size="lg">
        <Search className="h-4 w-4 mr-2" />
        Buscar geriátrico
      </Button>
    </div>
  );
}
