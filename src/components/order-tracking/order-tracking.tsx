"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getOrder } from "@/data/order";
import type { OrderScenario } from "@/types/order";
import { ArrowLeft, PackageX, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { DeliveryEstimate } from "./delivery-estimate";
import { OrderSummary } from "./order-summary";
import { ScenarioSwitcher } from "./scenario-switcher";
import { StatusAlert } from "./status-alert";
import { SupportActions } from "./support-actions";
import { TrackingTimeline } from "./tracking-timeline";

export function OrderTracking() {
  const [scenario, setScenario] = useState<OrderScenario>("delayed");
  const [isLoading, setIsLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const order = getOrder(scenario);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [scenario]);

  const handleScenarioChange = (next: OrderScenario) => {
    setIsLoading(true);
    setScenario(next);
  };

  return (
    <main className="flex min-h-screen flex-col bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <Container>
          <div
            className="flex items-center justify-between"
            style={{ paddingBlock: "clamp(0.625rem, 2vw, 0.875rem)" }}
          >
            <Button variant="ghost" size="icon" aria-label="Go back">
              <ArrowLeft className="size-5" />
            </Button>

            <div className="text-center">
              <h1
                className="font-semibold text-foreground"
                style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
              >
                Track order
              </h1>
              <p className="text-xs text-muted-foreground">
                {order?.id ?? "—"}
              </p>
            </div>

            <div className="size-8" />
          </div>
        </Container>
      </header>

      <div className="py-6">
        <Container>
          <ScenarioSwitcher value={scenario} onChange={handleScenarioChange} />
        </Container>
      </div>

      <div className="flex-1">
        <Container className="py-4">
          {!order ? (
            <ErrorState onRetry={() => setScenario("delayed")} />
          ) : isLoading ? (
            <LoadingState />
          ) : (
            <div className="space-y-4">
              <StatusAlert order={order} />
              <DeliveryEstimate order={order} />
              <TrackingTimeline order={order} />
              <OrderSummary
                order={order}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
              />
              <SupportActions order={order} />
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Loading order status">
      <div className="h-20 rounded-xl bg-muted" />
      <div className="h-24 rounded-xl bg-muted" />
      <div className="h-56 rounded-xl bg-muted" />
      <div className="h-24 rounded-xl bg-muted" />
      <div className="h-11 rounded-lg bg-muted" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-muted">
        <PackageX className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">
          We couldn&apos;t load this order
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong on our end. Try again.
        </p>
      </div>
      <Button variant="outline" onClick={onRetry} className="mt-1 gap-2">
        <RotateCw className="size-4" />
        Retry
      </Button>
    </div>
  );
}
