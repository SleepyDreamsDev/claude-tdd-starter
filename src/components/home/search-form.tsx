"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFormProps {
  locale: Locale;
  serviceTypes: { value: string; label: string }[];
  neighborhoods: { value: string; label: string }[];
  labels: {
    search_service: string;
    search_area: string;
    search_button: string;
  };
}

export function SearchForm({
  locale,
  serviceTypes,
  neighborhoods,
  labels,
}: SearchFormProps) {
  const router = useRouter();
  const [service, setService] = useState("");
  const [area, setArea] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (service) params.set("service", service);
    if (area) params.set("area", area);
    const query = params.toString();
    router.push(`/${locale}/providers${query ? `?${query}` : ""}`);
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select value={service} onValueChange={setService}>
        <SelectTrigger className="border-[0.5px] border-border-default bg-bg-card lg:flex-1">
          <SelectValue placeholder={labels.search_service} />
        </SelectTrigger>
        <SelectContent>
          {serviceTypes.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={area} onValueChange={setArea}>
        <SelectTrigger className="border-[0.5px] border-border-default bg-bg-card lg:flex-1">
          <SelectValue placeholder={labels.search_area} />
        </SelectTrigger>
        <SelectContent>
          {neighborhoods.map((n) => (
            <SelectItem key={n.value} value={n.value}>
              {n.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={handleSearch}
        className="rounded-lg px-7 py-3 text-[15px] font-medium lg:shrink-0"
      >
        {labels.search_button}
      </Button>
    </div>
  );
}
