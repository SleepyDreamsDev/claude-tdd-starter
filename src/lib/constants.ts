// src/lib/constants.ts — display metadata for service types, neighborhoods, add-ons

import type { AddOn, Neighborhood, ServiceType } from "@/lib/types";

export const BUNDLE_DISCOUNT_THRESHOLD = 3;
export const BUNDLE_DISCOUNT_PERCENT = 10;

// Icon names are Lucide React component names (string keys, not imports)
export const SERVICE_TYPES: {
  value: ServiceType;
  label: { ro: string; ru: string };
  icon: string;
}[] = [
  {
    value: "GENERAL_CLEANING",
    label: { ro: "Curățenie generală", ru: "Генеральная уборка" },
    icon: "Sparkles",
  },
  {
    value: "DEEP_CLEANING",
    label: { ro: "Curățenie profundă", ru: "Глубокая уборка" },
    icon: "Zap",
  },
  {
    value: "POST_RENOVATION",
    label: { ro: "Curățenie după reparație", ru: "Уборка после ремонта" },
    icon: "HardHat",
  },
  {
    value: "MAINTENANCE",
    label: { ro: "Curățenie de întreținere", ru: "Поддерживающая уборка" },
    icon: "RefreshCw",
  },
  {
    value: "WINDOW_CLEANING",
    label: { ro: "Spălarea geamurilor", ru: "Мытьё окон" },
    icon: "Square",
  },
  {
    value: "CARPET_CLEANING",
    label: { ro: "Curățarea covoarelor", ru: "Чистка ковров" },
    icon: "Layers",
  },
  {
    value: "UPHOLSTERY_CLEANING",
    label: { ro: "Curățare mobilier moale", ru: "Чистка мягкой мебели" },
    icon: "Sofa",
  },
  {
    value: "MOVE_IN_OUT",
    label: { ro: "Curățenie la mutare", ru: "Уборка при переезде" },
    icon: "PackageOpen",
  },
];

export const NEIGHBORHOODS: {
  value: Neighborhood;
  label: { ro: string; ru: string };
}[] = [
  { value: "centru", label: { ro: "Centru", ru: "Центр" } },
  { value: "botanica", label: { ro: "Botanica", ru: "Ботаника" } },
  { value: "buiucani", label: { ro: "Buiucani", ru: "Буюканы" } },
  { value: "ciocana", label: { ro: "Ciocana", ru: "Чеканы" } },
  { value: "riscani", label: { ro: "Rîșcani", ru: "Рышкановка" } },
  { value: "telecentru", label: { ro: "Telecentru", ru: "Телецентр" } },
  { value: "durlesti", label: { ro: "Durlești", ru: "Дурлешты" } },
  { value: "sculeni", label: { ro: "Sculeni", ru: "Скулены" } },
  { value: "posta-veche", label: { ro: "Poșta Veche", ru: "Старая Почта" } },
  { value: "rascanovca", label: { ro: "Râșcanovca", ru: "Рышкановка-Сев." } },
];

export const ADD_ONS: AddOn[] = [
  {
    type: "WINDOW_CLEANING",
    label: { ro: "Spălat geamuri (per geam)", ru: "Мытьё окон (за окно)" },
    priceMdl: 50,
  },
  {
    type: "CARPET_CLEANING",
    label: { ro: "Curățat covor (per m²)", ru: "Чистка ковра (за м²)" },
    priceMdl: 25,
  },
  {
    type: "BALCONY_CLEANING",
    label: { ro: "Curățenie balcon", ru: "Уборка балкона" },
    priceMdl: 150,
  },
  {
    type: "OVEN_CLEANING",
    label: { ro: "Curățare cuptor", ru: "Чистка духовки" },
    priceMdl: 200,
  },
  {
    type: "FRIDGE_CLEANING",
    label: { ro: "Curățare frigider", ru: "Чистка холодильника" },
    priceMdl: 150,
  },
  {
    type: "UPHOLSTERY_CLEANING",
    label: {
      ro: "Curățare mobilier moale (per piesă)",
      ru: "Чистка мягкой мебели (за ед.)",
    },
    priceMdl: 300,
  },
];
