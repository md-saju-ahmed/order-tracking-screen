import { STATUS_META } from "@/lib/utils";
import type { Order } from "@/types/order";
import { CalendarCheck2, CalendarClock } from "lucide-react";

export function DeliveryEstimate({ order }: { order: Order }) {
  const { icon: StatusIcon, label } = STATUS_META[order.status];
  const delivered = order.timeline.find((step) => step.status === "delivered");
  const isDelivered = order.status === "delivered" && delivered?.timestamp;

  return (
    <section className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <StatusIcon className="size-3.5" />
            {label}
          </span>

          {isDelivered ? (
            <p className="mt-3 text-lg leading-tight font-semibold text-foreground">
              {delivered.timestamp}
            </p>
          ) : order.deliveryEstimate ? (
            <>
              <p className="mt-3 text-lg leading-tight font-semibold text-foreground">
                {order.deliveryEstimate.date}
              </p>
              {order.deliveryEstimate.time && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {order.deliveryEstimate.time}
                </p>
              )}
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Estimate not available yet
            </p>
          )}
        </div>

        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
          {isDelivered ? (
            <CalendarCheck2 className="size-5 text-foreground" />
          ) : (
            <CalendarClock className="size-5 text-foreground" />
          )}
        </div>
      </div>

      {order.deliveryEstimate?.originalDate && (
        <p className="mt-3 border-t pt-3 text-xs text-muted-foreground">
          Originally expected {order.deliveryEstimate.originalDate}
        </p>
      )}
    </section>
  );
}
