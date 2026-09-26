import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full max-w-120 mx-auto px-4", className)}
      {...props}
    />
  );
}
