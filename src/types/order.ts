import type { StaticImageData } from "next/image";

export type OrderScenario = "delayed" | "not-received" | "tracking-pending";

export type OrderStatus =
  | "confirmed"
  | "processing"
  | "shipped"
  | "out-for-delivery"
  | "delivered";

export type TimelineStepState = "completed" | "current" | "upcoming";

export type AlertTone = "info" | "warning" | "error";

export interface TimelineStep {
  status: OrderStatus;
  label: string;
  state: TimelineStepState;
  timestamp?: string;
  note?: string;
}

export interface Product {
  name: string;
  image: StaticImageData;
  variant?: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Payment {
  method: string;
  lastFour?: string;
}

export interface Pricing {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Tracking {
  carrier: string;
  trackingNumber: string;
}

export interface OrderDetails {
  placedAt: string;
  shippingAddress: ShippingAddress;
  payment: Payment;
  pricing: Pricing;
  tracking?: Tracking;
}

export interface DeliveryEstimate {
  date: string;
  time?: string;
  originalDate?: string;
}

export interface StatusAlert {
  tone: AlertTone;
  title: string;
  description: string;
}

export type SupportActionKind = "contact-support" | "report-issue";

export interface SupportAction {
  label: string;
  kind: SupportActionKind;
  primary?: boolean;
}

export interface Order {
  id: string;
  scenario: OrderScenario;
  status: OrderStatus;
  alert: StatusAlert;
  deliveryEstimate?: DeliveryEstimate;
  timeline: TimelineStep[];
  product: Product;
  details: OrderDetails;
  actions: SupportAction[];
}
