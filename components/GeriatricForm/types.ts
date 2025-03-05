import { Therapy } from "@prisma/client";

export type GeriatricFormData = {
  name: string;
  description: string;
  priceRangeMin: number;
  priceRangeMax: number;
  hasDayCare: boolean;
  hasPermanentStay: boolean;
  hasPrivateRoom: boolean;
  hasSharedRoom: boolean;
  hasPrivateBath: boolean;
  hasSharedBath: boolean;
  hasBasicCare: boolean;
  hasSpecializedCare: boolean;
  hasAlzheimerCare: boolean;
  hasReducedMobility: boolean;
  has24hMedical: boolean;
  mainImage?: string;
  therapies: Therapy[];
  address: string;
  street: string;
  streetNumber: string;
  city: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
};
