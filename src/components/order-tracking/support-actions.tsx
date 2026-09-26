"use client";

import { Button } from "@/components/ui/button";
import type { Order, SupportActionKind } from "@/types/order";
import { Info, MessageCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";

const ACTION_ICON: Record<SupportActionKind, typeof MessageCircle> = {
  "contact-support": MessageCircle,
  "report-issue": TriangleAlert,
};

const NOT_IMPLEMENTED_MESSAGE = "This functionality hasn't been added yet.";

export function SupportActions({ order }: { order: Order }) {
  const [notice, setNotice] = useState<SupportActionKind | null>(null);

  const handleClick = (kind: SupportActionKind) => {
    setNotice(kind);
  };

  return (
    <section className="space-y-2 pb-6">
      {notice && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground">
          <Info className="size-4 shrink-0" />
          <span>{NOT_IMPLEMENTED_MESSAGE}</span>
        </div>
      )}

      {order.actions.map((action) => {
        const Icon = ACTION_ICON[action.kind];

        return (
          <Button
            key={action.kind}
            type="button"
            variant={action.primary ? "default" : "outline"}
            onClick={() => handleClick(action.kind)}
            className="h-11 w-full gap-2 text-sm"
          >
            <Icon className="size-4" />
            {action.label}
          </Button>
        );
      })}
    </section>
  );
}
