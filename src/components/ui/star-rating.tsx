import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  countLabel?: string;
  ariaLabel?: string;
  className?: string;
}

const STAR_SIZES = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
};

function StarIcon({ filled, size }: { filled: boolean; size: "sm" | "md" }) {
  return (
    <svg
      data-testid={filled ? "star-filled" : "star-empty"}
      className={cn(
        STAR_SIZES[size],
        filled ? "text-rating" : "text-rating-empty",
      )}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="10,1.5 12.5,7.5 19,7.5 14,11.5 16,18 10,14 4,18 6,11.5 1,7.5 7.5,7.5" />
    </svg>
  );
}

export function StarRating({
  rating,
  count,
  size = "sm",
  showCount = true,
  countLabel,
  ariaLabel,
  className,
}: StarRatingProps) {
  const filledCount = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label={ariaLabel ?? `${rating} / 5`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < filledCount} size={size} />
        ))}
      </div>
      <span className="text-xs font-medium text-text-heading">{rating}</span>
      {showCount && count != null && countLabel && (
        <span className="text-[11px] text-text-muted">
          ({count} {countLabel})
        </span>
      )}
    </div>
  );
}
