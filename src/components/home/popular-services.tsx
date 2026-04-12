import Link from "next/link";
import {
  Sparkles,
  Zap,
  HardHat,
  RefreshCw,
  Square,
  Layers,
  Sofa,
  PackageOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Zap,
  HardHat,
  RefreshCw,
  Square,
  Layers,
  Sofa,
  PackageOpen,
};

export type PopularServicesLabels = {
  title: string;
  starting_from: string;
};

export function PopularServices({
  services,
  labels,
  locale,
}: {
  services: {
    value: string;
    label: { ro: string; ru: string };
    icon: string;
    minPricePerSqm: number;
  }[];
  labels: PopularServicesLabels;
  locale: Locale;
}) {
  return (
    <section className="px-5 pb-6 lg:px-10 lg:pb-8">
      <h2 className="mb-3.5 font-heading text-[17px] text-text-heading lg:text-[20px]">
        {labels.title}
      </h2>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
        {services.map((service) => {
          const Icon = ICON_MAP[service.icon];
          const priceText = labels.starting_from.replace(
            "{{price}}",
            String(service.minPricePerSqm),
          );
          return (
            <Link
              key={service.value}
              href={`/${locale}/providers?service=${service.value}`}
              className="flex flex-col gap-2 rounded-xl border-[0.5px] border-border-default bg-bg-card p-4 transition-all duration-150 hover:border-border-hover hover:shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                {Icon && (
                  <Icon size={18} strokeWidth={1.3} className="text-primary" />
                )}
              </div>
              <span className="text-[13px] font-medium text-text-heading">
                {service.label[locale]}
              </span>
              <span className="text-[12px] text-text-secondary">
                {priceText}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
