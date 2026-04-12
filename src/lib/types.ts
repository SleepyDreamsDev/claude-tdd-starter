// src/lib/types.ts — shared data model (POC mock + future Prisma/Supabase)

export type Locale = "ro" | "ru";

export type ServiceType =
  | "GENERAL_CLEANING"
  | "DEEP_CLEANING"
  | "POST_RENOVATION"
  | "MAINTENANCE"
  | "WINDOW_CLEANING"
  | "CARPET_CLEANING"
  | "UPHOLSTERY_CLEANING"
  | "MOVE_IN_OUT";

export type Neighborhood =
  | "centru"
  | "botanica"
  | "buiucani"
  | "ciocana"
  | "riscani"
  | "telecentru"
  | "durlesti"
  | "sculeni"
  | "posta-veche"
  | "rascanovca";

export type BookingStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED_CLIENT"
  | "CANCELLED_PROVIDER";

export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

// --- Provider ---

export interface AvailabilitySlot {
  dayOfWeek: DayOfWeek;
  startTime: string; // "09:00"
  endTime: string; // "18:00"
}

export interface Provider {
  id: string;
  slug: string;
  companyName: string;
  bio: { ro: string; ru: string };
  phone: string;
  email: string;
  instagramHandle?: string;
  website?: string;
  photoUrls: string[];
  services: ServiceType[];
  pricePerSqm: number; // MDL
  minBooking?: number; // MDL
  coverageAreas: Neighborhood[];
  availability: AvailabilitySlot[];
  ratingAvg: number;
  reviewCount: number;
  verified: boolean;
  createdAt: string; // ISO date
}

// --- Review ---

export interface Review {
  id: string;
  providerId: string;
  clientName: string; // "Maria T."
  rating: number; // 1–5
  comment: string;
  locale: Locale; // original language of the review
  createdAt: string; // ISO date
}

// --- Booking ---

export interface RoomConfig {
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  livingRoom: number;
  balcony: number;
}

export interface AddOn {
  type: string;
  label: { ro: string; ru: string };
  priceMdl: number;
}

export interface BookingFormData {
  providerId: string;
  serviceType: ServiceType;
  rooms: RoomConfig;
  totalSqm: number;
  addOns: string[]; // add-on type keys
  preferredDate: string; // ISO date
  preferredTime: "morning" | "afternoon" | "evening";
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
}

export interface BookingConfirmation {
  id: string;
  referenceNumber: string; // "FC-2026-00042"
  provider: Pick<Provider, "companyName" | "phone" | "slug">;
  serviceType: ServiceType;
  scheduledDate: string;
  scheduledTime: string;
  totalPriceMdl: number;
  status: BookingStatus;
}

// --- Filters ---

export interface ProviderFilters {
  serviceType?: ServiceType;
  neighborhood?: Neighborhood;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  sortBy?: "rating" | "price_asc" | "price_desc" | "reviews";
  search?: string;
}

// --- i18n ---

export type Dictionary = Record<string, string | Record<string, string>>;
