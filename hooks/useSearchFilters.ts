import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchFilters } from "@/types/common";

export const useSearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: searchParams.get("q") || "",
    stayType: {
      dayCare: searchParams.get("hasDayCare") === "true",
      permanentStay: searchParams.get("hasPermanentStay") === "true",
    },
    roomType: {
      private: searchParams.get("hasPrivateRoom") === "true",
      shared: searchParams.get("hasSharedRoom") === "true",
      indifferent: !searchParams.get("hasPrivateRoom") && !searchParams.get("hasSharedRoom"),
    },
    bathType: {
      private: searchParams.get("hasPrivateBath") === "true",
      shared: searchParams.get("hasSharedBath") === "true",
      indifferent: !searchParams.get("hasPrivateBath") && !searchParams.get("hasSharedBath"),
    },
    medicalCare: {
      basic: searchParams.get("hasBasicCare") === "true",
      specialized: searchParams.get("hasSpecializedCare") === "true",
      alzheimer: searchParams.get("hasAlzheimerCare") === "true",
      reducedMobility: searchParams.get("hasReducedMobility") === "true",
      medical24h: searchParams.get("has24hMedical") === "true",
    },
    therapies: {
      kinesiology: searchParams.getAll("therapies").includes("kinesiology"),
      occupational: searchParams.getAll("therapies").includes("occupational"),
      psychological: searchParams.getAll("therapies").includes("psychological"),
      nutritionist: searchParams.getAll("therapies").includes("nutritionist"),
    },
    priceRange: {
      min: searchParams.get("priceRangeMin") ? parseInt(searchParams.get("priceRangeMin") as string) : 0,
      max: searchParams.get("priceRangeMax") ? parseInt(searchParams.get("priceRangeMax") as string) : 500000,
    },
    city: searchParams.get("city") || undefined,
    province: searchParams.get("province") || undefined,
    country: searchParams.get("country") || undefined,
  });

  const [tempPriceRange, setTempPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max,
  });

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.searchQuery) params.append("q", filters.searchQuery);
    if (filters.stayType.dayCare) params.append("hasDayCare", "true");
    if (filters.stayType.permanentStay) params.append("hasPermanentStay", "true");

    if (filters.roomType.private) params.append("hasPrivateRoom", "true");
    if (filters.roomType.shared) params.append("hasSharedRoom", "true");

    if (filters.bathType.private) params.append("hasPrivateBath", "true");
    if (filters.bathType.shared) params.append("hasSharedBath", "true");

    if (filters.medicalCare.basic) params.append("hasBasicCare", "true");
    if (filters.medicalCare.specialized) params.append("hasSpecializedCare", "true");
    if (filters.medicalCare.alzheimer) params.append("hasAlzheimerCare", "true");
    if (filters.medicalCare.reducedMobility) params.append("hasReducedMobility", "true");
    if (filters.medicalCare.medical24h) params.append("has24hMedical", "true");

    if (filters.therapies.kinesiology) params.append("therapies", "kinesiology");
    if (filters.therapies.occupational) params.append("therapies", "occupational");
    if (filters.therapies.psychological) params.append("therapies", "psychological");
    if (filters.therapies.nutritionist) params.append("therapies", "nutritionist");

    params.append("priceRangeMin", filters.priceRange.min.toString());
    params.append("priceRangeMax", filters.priceRange.max.toString());

    if (filters.city) params.append("city", filters.city);
    if (filters.province) params.append("province", filters.province);
    if (filters.country) params.append("country", filters.country);

    router.push(`/buscar-geriatrico?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      stayType: { dayCare: false, permanentStay: false },
      roomType: { private: false, shared: false, indifferent: true },
      bathType: { private: false, shared: false, indifferent: true },
      medicalCare: {
        basic: false,
        specialized: false,
        alzheimer: false,
        reducedMobility: false,
        medical24h: false,
      },
      therapies: {
        kinesiology: false,
        occupational: false,
        psychological: false,
        nutritionist: false,
      },
      priceRange: { min: 0, max: 500000 },
      city: undefined,
      province: undefined,
      country: undefined,
    });
    setTempPriceRange({ min: 0, max: 500000 });

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
