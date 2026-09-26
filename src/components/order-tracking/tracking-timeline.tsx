import { cn, STATUS_META } from "@/lib/utils";
import type { Order, TimelineStepState } from "@/types/order";
import { Check } from "lucide-react";

const NODE_STYLES: Record<TimelineStepState, string> = {
  completed: "border-emerald-500 bg-emerald-500 text-white",
  current: "border-primary bg-primary text-primary-foreground",
  upcoming: "border-border bg-muted text-muted-foreground/60",
};

const LABEL_STYLES: Record<TimelineStepState, string> = {
  completed: "text-foreground",
  current: "text-foreground",
  upcoming: "text-muted-foreground",
};

export function TrackingTimeline({ order }: { order: Order }) {
  return (
    <section className="rounded-xl border bg-card p-4">
      <h2 className="text-sm font-semibold text-foreground">
        Delivery progress
      </h2>

      <ol className="mt-4">
        {order.timeline.map((step, index) => {
          const isLast = index === order.timeline.length - 1;
          const { icon: StepIcon } = STATUS_META[step.status];

          return (
            <li key={step.status} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border",
                    NODE_STYLES[step.state],
                  )}
                >
                  {step.state === "completed" ? (
                    <Check className="size-3.5" />
                  ) : (
                    <StepIcon className="size-3.5" />
                  )}
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "my-1 w-px flex-1",
                      step.state === "completed"
                        ? "bg-emerald-400"
                        : "bg-border",
                    )}
                  />
                )}
              </div>

              <div className={cn("min-w-0 pb-6", isLast && "pb-0")}>
                <p
                  className={cn(
                    "text-sm font-medium",
                    LABEL_STYLES[step.state],
                  )}
                >
                  {step.label}
                </p>

                {step.timestamp && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.timestamp}
                  </p>
                )}

                {step.note && (
                  <p
                    className={cn(
                      "mt-1 text-xs font-medium",
                      step.state === "current"
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
