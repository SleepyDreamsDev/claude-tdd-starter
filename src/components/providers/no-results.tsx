"use client";

import { SearchX } from "lucide-react";

interface NoResultsProps {
  labels: {
    no_results: string;
    no_results_hint: string;
    reset_filters: string;
  };
  onReset: () => void;
}

export function NoResults({ labels, onReset }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX size={40} strokeWidth={1.3} className="text-text-muted mb-3" />
      <p className="text-text-heading font-medium mb-1">{labels.no_results}</p>
      <p className="text-sm text-text-secondary mb-4">
        {labels.no_results_hint}
      </p>
      <button
        onClick={onReset}
        className="text-sm text-primary hover:underline"
      >
        {labels.reset_filters}
      </button>
    </div>
  );
}
