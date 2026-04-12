import { format } from "date-fns";
import { getAvatarColor, getInitials } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";
import type { Review } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initials = getInitials(review.clientName);
  const avatar = getAvatarColor(review.clientName);
  const formattedDate = format(new Date(review.createdAt), "d MMM yyyy");

  return (
    <article className="rounded-[10px] border-[0.5px] border-border-light bg-bg-card p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium",
              avatar.bg,
              avatar.text,
            )}
          >
            {initials}
          </div>
          <span className="text-[13px] font-medium text-text-heading">
            {review.clientName}
          </span>
        </div>
        <StarRating rating={review.rating} showCount={false} size="sm" />
      </div>
      <p className="text-[13px] leading-[1.5] text-text-body">
        {review.comment}
      </p>
      <p
        data-testid="review-date"
        className="mt-1.5 text-[11px] text-text-muted"
      >
        {formattedDate}
      </p>
    </article>
  );
}
