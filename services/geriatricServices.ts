import { SearchFilters, SearchResult } from "@/types/common";
import axios from "axios";

export const fetchGeriatrics = async ({
  filters,
  pageParam = 1,
}: {
  filters: SearchFilters;
  pageParam: number;
}): Promise<SearchResult> => {

  const params = new URLSearchParams();

  if (filters.searchQuery) params.append("searchQuery", filters.searchQuery);
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
