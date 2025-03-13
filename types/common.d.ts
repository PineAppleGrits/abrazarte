import { BlogCategory, Geriatric } from "@prisma/client";
import { BlogPost as PrismBlogPost } from "@prisma/client";
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
  country?: string;
  city?: string;
  province?: string;
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
