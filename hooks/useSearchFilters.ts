"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { SearchFilters, Place } from "@/types/common"

export const useSearchFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse locations from URL
  const parseLocationsFromUrl = (): Place[] => {
    const locations: Place[] = []

    // Check for multiple locations (city0, city1, etc.)
    let index = 0
    while (searchParams.has(`city${index}`)) {
      locations.push({
        address: "",
        street: "",
        streetNumber: "",
        city: searchParams.get(`city${index}`) || "",
        province: searchParams.get(`province${index}`) || "",
        country: searchParams.get(`country${index}`) || "",
        latitude: 0,
        longitude: 0,
      })
      index++
    }

    // Also check for single location for backward compatibility
    if (locations.length === 0 && searchParams.has("city")) {
      locations.push({
        address: "",
        street: "",
        streetNumber: "",
        city: searchParams.get("city") || "",
        province: searchParams.get("province") || "",
        country: searchParams.get("country") || "",
        latitude: 0,
        longitude: 0,
      })
    }

    return locations
  }

  const initialFilters: SearchFilters = {
    searchQuery: searchParams.get("q") || "",
    rating: searchParams.get("rating") ? Number.parseInt(searchParams.get("rating") as string, 10) : 0,
    stayType: {
      dayCare: searchParams.get("hasDayCare") === "true",
      permanentStay: searchParams.get("hasPermanentStay") === "true",
    },
    roomType: {
      private: searchParams.get("hasPrivateRoom") === "true",
      double: searchParams.get("hasDoubleRoom") === "true",
      shared: searchParams.get("hasSharedRoom") === "true",
      indifferent:
        !searchParams.get("hasPrivateRoom") && !searchParams.get("hasDoubleRoom") && !searchParams.get("hasSharedRoom"),
    },
    dependency: {
      independent: searchParams.get("hasIndependentCare") === "true",
      semiDependent: searchParams.get("hasSemiDependent") === "true",
      dependent: searchParams.get("hasDependent") === "true",
      highComplexity: searchParams.get("hasHighComplexity") === "true",
    },
    medical: {
      nursing24: searchParams.get("has24hMedical") === "true",
      presentialDoctor: searchParams.get("hasPresentialDoctor") === "true",
      neurological: searchParams.get("hasAttentionForNeurologicalDiseases") === "true",
      medication: searchParams.get("hasMedicationSupply") === "true",
    },
    priceRange: {
      min: searchParams.get("priceRangeMin") ? Number.parseInt(searchParams.get("priceRangeMin") as string, 10) : 0,
      max: searchParams.get("priceRangeMax")
        ? Number.parseInt(searchParams.get("priceRangeMax") as string, 10)
        : 10000000,
    },
    locations: parseLocationsFromUrl(),
  }

  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [tempPriceRange, setTempPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  })

  // Update filters when URL changes
  useEffect(() => {
    setFilters(initialFilters)
    setTempPriceRange({
      min: initialFilters.priceRange.min,
      max: initialFilters.priceRange.max,
    })
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.searchQuery) params.append("q", filters.searchQuery)
    if (filters.rating) params.append("rating", filters.rating.toString())
    if (filters.stayType.dayCare) params.append("hasDayCare", "true")
    if (filters.stayType.permanentStay) params.append("hasPermanentStay", "true")

    if (filters.roomType.private) params.append("hasPrivateRoom", "true")
    if (filters.roomType.double) params.append("hasDoubleRoom", "true")
    if (filters.roomType.shared) params.append("hasSharedRoom", "true")

    if (filters.dependency.independent) params.append("hasIndependentCare", "true")
    if (filters.dependency.semiDependent) params.append("hasSemiDependent", "true")
    if (filters.dependency.dependent) params.append("hasDependent", "true")
    if (filters.dependency.highComplexity) params.append("hasHighComplexity", "true")

    if (filters.medical.nursing24) params.append("has24hMedical", "true")
    if (filters.medical.presentialDoctor) params.append("hasPresentialDoctor", "true")
    if (filters.medical.neurological) params.append("hasAttentionForNeurologicalDiseases", "true")
    if (filters.medical.medication) params.append("hasMedicationSupply", "true")

    params.append("priceRangeMin", filters.priceRange.min.toString())
    params.append("priceRangeMax", filters.priceRange.max.toString())

    // Add multiple locations
    filters.locations.forEach((location, index) => {
      if (location.city) params.append(`city${index}`, location.city)
      if (location.province) params.append(`province${index}`, location.province)
      if (location.country) params.append(`country${index}`, location.country)
    })

    router.push(`/buscar-geriatrico?${params.toString()}`, { scroll: false })
  }

  const resetFilters = () => {
    setFilters({
      rating: 0,
      searchQuery: "",
      stayType: { dayCare: false, permanentStay: false },
      roomType: { private: false, double: false, shared: false, indifferent: true },
      dependency: {
        independent: false,
        semiDependent: false,
        dependent: false,
        highComplexity: false,
      },
      medical: {
        nursing24: false,
        presentialDoctor: false,
        neurological: false,
        medication: false,
      },
      priceRange: { min: 0, max: 10000000 },
      locations: [],
    })
    setTempPriceRange({ min: 0, max: 10000000 })
    router.push("/buscar-geriatrico")
  }

  return {
    filters,
    setFilters,
    tempPriceRange,
    setTempPriceRange,
    applyFilters,
    resetFilters,
  }
}

