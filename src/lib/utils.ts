export { cn } from "cn";

import type { OrderStatus } from "@/types/order";
import {
  CircleCheck,
  MapPin,
  PackageCheck,
  PackageSearch,
  Truck,
  type LucideIcon,
} from "lucide-react";

export const STATUS_META: Record<
  OrderStatus,
  { label: string; icon: LucideIcon }
> = {
  confirmed: {
    label: "Order confirmed",
    icon: CircleCheck,
  },
  processing: {
    label: "Processing",
    icon: PackageSearch,
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
  },
  "out-for-delivery": {
    label: "Out for delivery",
    icon: MapPin,
  },
  delivered: {
    label: "Delivered",
    icon: PackageCheck,
  },
};
