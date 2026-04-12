"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  labels: {
    sort_by: string;
    sort_rating: string;
    sort_price_asc: string;
    sort_price_desc: string;
    sort_reviews: string;
  };
}

export function SortSelect({ value, onChange, labels }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-[0.5px] border-border-default bg-bg-card text-sm">
        <SelectValue placeholder={labels.sort_by} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="rating">{labels.sort_rating}</SelectItem>
        <SelectItem value="price_asc">{labels.sort_price_asc}</SelectItem>
        <SelectItem value="price_desc">{labels.sort_price_desc}</SelectItem>
        <SelectItem value="reviews">{labels.sort_reviews}</SelectItem>
      </SelectContent>
    </Select>
  );
}
