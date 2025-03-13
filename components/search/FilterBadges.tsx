"use client"

import { Badge } from "@/components/ui/badge"
import type { SearchFilters } from "@/types/common"
import { X, MapPin } from "lucide-react"

interface FilterBadgesProps {
  filters: SearchFilters
  setFilters: (filters: SearchFilters) => void
  applyFilters: () => void
}

export function FilterBadges({ filters, setFilters, applyFilters }: FilterBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {filters.searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1.5 text-base">
          Búsqueda: {filters.searchQuery}
          <button
            onClick={() => {
              setFilters({ ...filters, searchQuery: "" })
              applyFilters()
            }}
            className="ml-1 hover:text-destructive"
            aria-label="Eliminar filtro de búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        </Badge>
      )}

      {filters.locations &&
        filters.locations.length > 0 &&
        filters.locations.map((location, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1.5 text-base bg-brand-3/50"
          >
            <MapPin className="h-4 w-4" />
            {location.city}, {location.province}
            <button
              onClick={() => {
                const newLocations = [...filters.locations]
                newLocations.splice(index, 1)
                setFilters({ ...filters, locations: newLocations })
                applyFilters()
              }}
              className="ml-1 hover:text-destructive"
              aria-label={`Eliminar ubicación ${location.city}`}
            >
              <X className="h-4 w-4" />
            </button>
          </Badge>
        ))}

      {filters.rating > 0 && (
        <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1.5 text-base">
          Calificación mínima: {filters.rating / 2} estrellas
          <button
            onClick={() => {
              setFilters({ ...filters, rating: 0 })
              applyFilters()
            }}
            className="ml-1 hover:text-destructive"
            aria-label="Eliminar filtro de calificación"
          >
            <X className="h-4 w-4" />
          </button>
        </Badge>
      )}

      {/* Additional badges for other filters could be added here */}
    </div>
  )
}

