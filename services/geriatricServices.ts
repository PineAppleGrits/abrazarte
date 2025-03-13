import type { SearchFilters, SearchResult } from "@/types/common";
import axios from "axios";

export const fetchGeriatrics = async ({
  filters,
  pageParam = 1,
}: {
  filters: SearchFilters;
  pageParam: number;
}): Promise<SearchResult> => {
  const params = new URLSearchParams();

  if (filters.rating) params.append("rating", filters.rating.toString());
  // Search Query & Stay Type
  if (filters.searchQuery) params.append("searchQuery", filters.searchQuery);
  if (filters.stayType.dayCare) params.append("hasDayCare", "true");
  if (filters.stayType.permanentStay) params.append("hasPermanentStay", "true");

  // Room Type (bed filtering)
  if (filters.roomType.private) params.append("hasPrivateRoom", "true");
  if (filters.roomType.double) params.append("hasDoubleRoom", "true");
  if (filters.roomType.shared) params.append("hasSharedRoom", "true");

  // Dependency Filters
  if (filters.dependency.independent) params.append("hasIndependentCare", "true");
  if (filters.dependency.semiDependent) params.append("hasSemiDependent", "true");
  if (filters.dependency.dependent) params.append("hasDependent", "true");
  if (filters.dependency.highComplexity) params.append("hasHighComplexity", "true");

  // Medical Filters
  if (filters.medical.nursing24) params.append("has24hMedical", "true");
  if (filters.medical.presentialDoctor) params.append("hasPresentialDoctor", "true");
  if (filters.medical.neurological) params.append("hasAttentionForNeurologicalDiseases", "true");
  if (filters.medical.medication) params.append("hasMedicationSupply", "true");

  // Price Range
  params.append("priceRangeMin", filters.priceRange.min.toString());
  params.append("priceRangeMax", filters.priceRange.max.toString());

  // Multiple Locations
  filters.locations.forEach((location, index) => {
    if (location.city) params.append(`city${index}`, location.city);
    if (location.province) params.append(`province${index}`, location.province);
    if (location.country) params.append(`country${index}`, location.country);
  });

  // Pagination
  params.append("page", pageParam.toString());
  params.append("limit", "10"); // Number of results per page

  const response = await axios.get(`/api/geriatrics/search?${params.toString()}`);
  return response.data;
};

export const addToFavorites = async (geriatricId: string) => {
  const response = await axios.post("/api/favorites", { geriatricId });
  return response.data;
};

export const logSearch = async (filters: SearchFilters, resultsCount: number) => {
  await axios.post("/api/search-log", {
    filters,
    resultsCount,
  });
};
