import { cn } from "@/lib/utils";
import type { Order } from "@/types/order";
import { AlertTriangle, Info, OctagonAlert } from "lucide-react";

const TONE_STYLES = {
  info: {
    icon: Info,
    section:
      "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40",
    iconWrap: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    title: "text-blue-900 dark:text-blue-200",
    description: "text-blue-800/80 dark:text-blue-200/80",
  },
  warning: {
    icon: AlertTriangle,
    section:
      "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
    iconWrap:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    title: "text-amber-900 dark:text-amber-200",
    description: "text-amber-800/80 dark:text-amber-200/80",
  },
  error: {
    icon: OctagonAlert,
    section: "border-destructive/25 bg-destructive/5",
    iconWrap: "bg-destructive/10 text-destructive",
    title: "text-destructive",
    description: "text-destructive/80",
  },
} as const;

export function StatusAlert({ order }: { order: Order }) {
  const tone = TONE_STYLES[order.alert.tone];
  const Icon = tone.icon;

  return (
    <section
      role="status"
      className={cn("flex gap-3 rounded-xl border p-4", tone.section)}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          tone.iconWrap,
        )}
      >
        <Icon className="size-4.5" />
      </div>

      <div className="min-w-0 pt-0.5">
        <p className={cn("text-sm font-semibold", tone.title)}>
          {order.alert.title}
        </p>
        <p className={cn("mt-1 text-sm leading-5", tone.description)}>
          {order.alert.description}
        </p>
      </div>
    </section>
  );
}
