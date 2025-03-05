import { BlogCategory, Geriatric } from "@prisma/client";
import { BlogPost as PrismBlogPost } from "@prisma/client";
export type SearchFilters = {
  searchQuery: string;
  stayType: {
    dayCare: boolean;
    permanentStay: boolean;
  };
  roomType: {
    private: boolean;
    shared: boolean;
    indifferent: boolean;
  };
  bathType: {
    private: boolean;
    shared: boolean;
    indifferent: boolean;
  };
  medicalCare: {
    basic: boolean;
    specialized: boolean;
    alzheimer: boolean;
    reducedMobility: boolean;
    medical24h: boolean;
  };
  therapies: {
    kinesiology: boolean;
    occupational: boolean;
    psychological: boolean;
    nutritionist: boolean;
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
  therapies: string[];
  mainImage: string | null;
};

interface BlogPost extends PrismBlogPost {
  category: BlogCategory;
}
export { BlogCategory, type BlogPost };

