"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GooglePlacesSearch, type Place } from "@/components/GooglePlacesSearch";
import { Badge } from "@/components/ui/badge";
import { SearchFilters } from "@/types/common";

interface SearchBoxProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
}

export function SearchBox({ filters, setFilters, applyFilters }: SearchBoxProps) {
  const handleAddLocation = (place: Place): void => {
    // Avoid adding duplicate locations
    if (
      !filters.locations.some(
        (loc) => loc.city === place.city && loc.province === place.province && loc.country === place.country
      )
    ) {
      setFilters({
        ...filters,
        locations: [...filters.locations, place],
      });
    }
  };

  const handleRemoveLocation = (index: number): void => {
    const updatedLocations = [...filters.locations];
    updatedLocations.splice(index, 1);
    setFilters({
      ...filters,
      locations: updatedLocations,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Input and Button */}
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

        <Button className="md:w-auto" onClick={applyFilters} size="lg">
          <Search className="h-4 w-4 mr-2" />
          Buscar geriátrico
        </Button>
      </div>

      {/* Add Location Input */}
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <div className="flex-1">
          <GooglePlacesSearch onPlaceSelect={handleAddLocation} placeholder="Buscar por ciudad, provincia o país..." />
        </div>
      </div>
    </div>
  );
}
