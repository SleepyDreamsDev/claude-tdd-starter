// src/lib/pricing.ts — deterministic client-side price calculation

import type { AddOn, RoomConfig } from "@/lib/types";

export const DEFAULT_SQM_PER_ROOM: Record<keyof RoomConfig, number> = {
  bedrooms: 14,
  bathrooms: 5,
  kitchen: 10,
  livingRoom: 20,
  balcony: 4,
};

export function calculateTotalSqm(rooms: RoomConfig): number {
  return (
    rooms.bedrooms * DEFAULT_SQM_PER_ROOM.bedrooms +
    rooms.bathrooms * DEFAULT_SQM_PER_ROOM.bathrooms +
    rooms.kitchen * DEFAULT_SQM_PER_ROOM.kitchen +
    rooms.livingRoom * DEFAULT_SQM_PER_ROOM.livingRoom +
    rooms.balcony * DEFAULT_SQM_PER_ROOM.balcony
  );
}

export function calculatePrice(
  totalSqm: number,
  pricePerSqm: number,
  addOns: AddOn[],
  discountPercent: number = 0,
): { base: number; addOnsTotal: number; discount: number; total: number } {
  const base = totalSqm * pricePerSqm;
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.priceMdl, 0);
  const subtotal = base + addOnsTotal;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discount;
  return { base, addOnsTotal, discount, total };
}
