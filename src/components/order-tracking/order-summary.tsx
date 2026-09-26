import { cn } from "@/lib/utils";
import type { Order } from "@/types/order";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface OrderSummaryProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const currency = (value: number) =>
  value === 0 ? "Free" : `$${value.toFixed(2)}`;

export function OrderSummary({ order, open, onOpenChange }: OrderSummaryProps) {
  const { product, details } = order;

  return (
    <section id="order-details" className="rounded-xl border bg-card">
      <div className="flex gap-3 p-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm leading-5 font-semibold text-foreground">
            {product.name}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {[product.variant, `Qty ${product.quantity}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {currency(product.price)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-t px-4 py-3 text-sm font-medium text-foreground"
      >
        <span>Order details</span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t px-4 py-4 text-xs">
          <Row label="Order number" value={order.id} strong />
          <Row label="Placed on" value={details.placedAt} />
          <Row
            label="Shipping to"
            value={`${details.shippingAddress.name}, ${details.shippingAddress.addressLine}, ${details.shippingAddress.city} ${details.shippingAddress.state} ${details.shippingAddress.postalCode}`}
          />
          <Row
            label="Payment"
            value={
              details.payment.lastFour
                ? `${details.payment.method} •••• ${details.payment.lastFour}`
                : details.payment.method
            }
          />

          {details.tracking && (
            <>
              <Row label="Carrier" value={details.tracking.carrier} />
              <Row
                label="Tracking number"
                value={details.tracking.trackingNumber}
              />
            </>
          )}

          <div className="space-y-1.5 border-t pt-3">
            <Row
              label="Subtotal"
              value={currency(details.pricing.subtotal)}
              muted
            />
            <Row
              label="Shipping"
              value={currency(details.pricing.shipping)}
              muted
            />
            <Row label="Tax" value={currency(details.pricing.tax)} muted />
          </div>

          <Row
            label="Total"
            value={currency(details.pricing.total)}
            strong
            className="border-t pt-3 text-sm"
          />
        </div>
      )}
    </section>
  );
}

function Row({
  label,
  value,
  muted,
  strong,
  className,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <span className={muted ? "text-muted-foreground" : "text-foreground"}>
        {label}
      </span>
      <span
        className={cn(
          "text-right",
          strong ? "font-semibold text-foreground" : "text-muted-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
