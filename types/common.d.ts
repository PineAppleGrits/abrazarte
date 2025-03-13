import { BlogCategory, type Geriatric } from "@prisma/client";
import type { BlogPost as PrismBlogPost } from "@prisma/client";

export type Place = {
  address: string;
  street: string;
  streetNumber: string;
  city: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type SearchFilters = {
  searchQuery: string;
  rating: number; // max 10
  stayType: {
    dayCare: boolean;
    permanentStay: boolean;
  };
  roomType: {
    private: boolean;
    double: boolean;
    shared: boolean;
    indifferent: boolean;
  };
  dependency: {
    independent: boolean;
    semiDependent: boolean;
    dependent: boolean;
    highComplexity: boolean;
  };
  medical: {
    nursing24: boolean;
    presentialDoctor: boolean;
    neurological: boolean;
    medication: boolean;
  };
  priceRange: {
    min: number;
    max: number;
  };
  locations: Place[];
};

export type SearchResult = {
  geriatrics: GeriatricSearchResult[];
  secondaryResults: GeriatricSearchResult[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
};

export type GeriatricSearchResult = Geriatric & {
  images: string[];
  mainImage: string | null;
};

interface BlogPost extends PrismBlogPost {
  category: BlogCategory;
}
export { BlogCategory, type BlogPost };
