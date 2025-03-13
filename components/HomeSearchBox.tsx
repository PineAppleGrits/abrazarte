"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Plus, X } from "lucide-react"
import { GooglePlacesSearch, type Place } from "@/components/GooglePlacesSearch"
import { Badge } from "@/components/ui/badge"

export function HomeSearchBox() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [locations, setLocations] = useState<Place[]>([])
  const [showLocationInput, setShowLocationInput] = useState(false)

  const handleAddLocation = (place: Place) => {
    // Check if location already exists to avoid duplicates
    if (!locations.some((loc) => loc.city === place.city && loc.province === place.province)) {
      setLocations([...locations, place])
    }
    setShowLocationInput(false)
  }

  const handleRemoveLocation = (index: number) => {
    const newLocations = [...locations]
    newLocations.splice(index, 1)
    setLocations(newLocations)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (searchQuery) {
      params.append("q", searchQuery)
    }

    // Add all locations to the search params
    locations.forEach((location, index) => {
      if (location.city) params.append(`city${index}`, location.city)
      if (location.province) params.append(`province${index}`, location.province)
      if (location.country) params.append(`country${index}`, location.country)
    })

    router.push(`/buscar-geriatrico?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, servicios o características..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
          </div>
        </div>

        <Button onClick={handleSearch} size="lg" className="h-auto py-6 px-8 text-lg">
          <Search className="h-5 w-5 mr-2" />
          Buscar
        </Button>
      </div>

      {/* Location badges */}
      {locations.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {locations.map((location, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-2 text-base flex items-center gap-2 bg-brand-3/50"
            >
              <MapPin className="h-4 w-4" />
              {location.city}, {location.province}
              <button onClick={() => handleRemoveLocation(index)} className="ml-1 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add location button or input */}
      {!showLocationInput ? (
        <Button
          variant="outline"
          onClick={() => setShowLocationInput(true)}
          className="flex items-center gap-2 text-base"
        >
          <Plus className="h-4 w-4" />
          Agregar ubicación
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <div className="flex-1">
            <GooglePlacesSearch
              onPlaceSelect={handleAddLocation}
              placeholder="Buscar por ciudad, provincia o país..."
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowLocationInput(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}

