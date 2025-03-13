import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SearchFilters } from "@/types/common";

export const useSearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilters: SearchFilters = {
    searchQuery: searchParams.get("q") || "",
    rating: searchParams.get("rating") ? parseInt(searchParams.get("rating") as string, 10) : 0,
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
      min: searchParams.get("priceRangeMin") ? parseInt(searchParams.get("priceRangeMin") as string, 10) : 0,
      max: searchParams.get("priceRangeMax") ? parseInt(searchParams.get("priceRangeMax") as string, 10) : 10000000,
    },
    city: searchParams.get("city") || undefined,
    province: searchParams.get("province") || undefined,
    country: searchParams.get("country") || undefined,
  };

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [tempPriceRange, setTempPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  });

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.searchQuery) params.append("q", filters.searchQuery);
    if (filters.rating) params.append("rating", filters.rating.toString());
    if (filters.stayType.dayCare) params.append("hasDayCare", "true");
    if (filters.stayType.permanentStay) params.append("hasPermanentStay", "true");

    if (filters.roomType.private) params.append("hasPrivateRoom", "true");
    if (filters.roomType.double) params.append("hasDoubleRoom", "true");
    if (filters.roomType.shared) params.append("hasSharedRoom", "true");

    if (filters.dependency.independent) params.append("hasIndependentCare", "true");
    if (filters.dependency.semiDependent) params.append("hasSemiDependent", "true");
    if (filters.dependency.dependent) params.append("hasDependent", "true");
    if (filters.dependency.highComplexity) params.append("hasHighComplexity", "true");

    if (filters.medical.nursing24) params.append("has24hMedical", "true");
    if (filters.medical.presentialDoctor) params.append("hasPresentialDoctor", "true");
    if (filters.medical.neurological) params.append("hasAttentionForNeurologicalDiseases", "true");
    if (filters.medical.medication) params.append("hasMedicationSupply", "true");

    params.append("priceRangeMin", filters.priceRange.min.toString());
    params.append("priceRangeMax", filters.priceRange.max.toString());

    if (filters.city) params.append("city", filters.city);
    if (filters.province) params.append("province", filters.province);
    if (filters.country) params.append("country", filters.country);

    router.push(`/buscar-geriatrico?${params.toString()}`, { scroll: false });
  };

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
      city: undefined,
      province: undefined,
      country: undefined,
    });
    setTempPriceRange({ min: 0, max: 10000000 });
    router.push("/buscar-geriatrico");
  };

  return {
    filters,
    setFilters,
    tempPriceRange,
    setTempPriceRange,
    applyFilters,
    resetFilters,
  };
};
