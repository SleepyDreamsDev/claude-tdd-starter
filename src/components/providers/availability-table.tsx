import type { AvailabilitySlot, DayOfWeek } from "@/lib/types";

type DayLabels = Record<
  | "day_mon"
  | "day_tue"
  | "day_wed"
  | "day_thu"
  | "day_fri"
  | "day_sat"
  | "day_sun",
  string
>;

interface AvailabilityTableProps {
  slots: AvailabilitySlot[];
  labels: DayLabels & { no_availability: string };
}

const DAY_ORDER: DayOfWeek[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

const DAY_KEY_MAP: Record<DayOfWeek, keyof DayLabels> = {
  MON: "day_mon",
  TUE: "day_tue",
  WED: "day_wed",
  THU: "day_thu",
  FRI: "day_fri",
  SAT: "day_sat",
  SUN: "day_sun",
};

export function AvailabilityTable({ slots, labels }: AvailabilityTableProps) {
  if (slots.length === 0) {
    return (
      <p className="text-[13px] text-text-muted">{labels.no_availability}</p>
    );
  }

  const slotMap = new Map(slots.map((s) => [s.dayOfWeek, s]));

  return (
    <div className="flex flex-col gap-1.5">
      {DAY_ORDER.filter((day) => slotMap.has(day)).map((day) => {
        const slot = slotMap.get(day)!;
        return (
          <div
            key={day}
            className="flex items-center justify-between text-[13px]"
          >
            <span className="font-medium text-text-heading">
              {labels[DAY_KEY_MAP[day]]}
            </span>
            <span className="text-text-body">
              {slot.startTime} – {slot.endTime}
            </span>
          </div>
        );
      })}
    </div>
  );
}
