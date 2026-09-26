"use client";
import { cn } from "@/lib/utils";
import type { OrderScenario } from "@/types/order";

const SCENARIOS: { value: OrderScenario; label: string }[] = [
  {
    value: "delayed",
    label: "Delayed",
  },
  {
    value: "not-received",
    label: "Not received",
  },
  {
    value: "tracking-pending",
    label: "No tracking yet",
  },
];

export function ScenarioSwitcher({
  value,
  onChange,
}: {
  value: OrderScenario;
  onChange: (scenario: OrderScenario) => void;
}) {
  return (
    <div
      role="tablist"
      className="grid grid-cols-3 gap-1 rounded-xl border bg-card p-2.5"
    >
      {SCENARIOS.map((scenario) => {
        const active = value === scenario.value;

        return (
          <button
            key={scenario.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(scenario.value)}
            className={cn(
              "rounded-xl px-2 py-3 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {scenario.label}
          </button>
        );
      })}
    </div>
  );
}
