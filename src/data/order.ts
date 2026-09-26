import aeroRunner from "@/assets/products/aero-runner.jpg";
import type { Order, OrderDetails, OrderScenario } from "@/types/order";

const product = {
  name: "Aero Runner 2 Performance Sneaker",
  image: aeroRunner,
  variant: "Crimson · US 10",
  quantity: 1,
  price: 129,
};

const baseDetails: OrderDetails = {
  placedAt: "Sep 20, 2026",
  shippingAddress: {
    name: "Alex Johnson",
    addressLine: "123 Market Street",
    city: "Memphis",
    state: "TN",
    postalCode: "38103",
  },
  payment: {
    method: "Visa",
    lastFour: "4242",
  },
  pricing: {
    subtotal: 129,
    shipping: 0,
    tax: 10.32,
    total: 139.32,
  },
};

const withTracking: OrderDetails = {
  ...baseDetails,
  tracking: {
    carrier: "UPS Ground",
    trackingNumber: "1Z999AA10123456784",
  },
};

export const orders: Record<OrderScenario, Order> = {
  delayed: {
    id: "ORD-89210",
    scenario: "delayed",
    status: "out-for-delivery",
    alert: {
      tone: "warning",
      title: "Delayed in transit",
      description:
        "Severe weather is holding your package at the Memphis, TN facility. It's safe and now expected Sat, Sep 28 — sorry for the wait.",
    },
    deliveryEstimate: {
      date: "Sat, Sep 28",
      time: "By 8:00 PM",
      originalDate: "Tue, Sep 24",
    },
    timeline: [
      {
        status: "confirmed",
        label: "Order confirmed",
        state: "completed",
        timestamp: "Sep 20, 10:24 AM",
      },
      {
        status: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "Sep 21, 2:15 PM",
      },
      {
        status: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "Sep 22, 8:30 AM",
        note: "Departed Louisville, KY",
      },
      {
        status: "out-for-delivery",
        label: "Out for delivery",
        state: "current",
        timestamp: "Sep 24, 9:12 AM",
        note: "Weather hold in Memphis, TN",
      },
      { status: "delivered", label: "Delivered", state: "upcoming" },
    ],
    product,
    details: withTracking,
    actions: [
      { label: "Report a problem", kind: "report-issue" },
      { label: "Contact support", kind: "contact-support", primary: true },
    ],
  },

  "not-received": {
    id: "ORD-89210",
    scenario: "not-received",
    status: "delivered",
    alert: {
      tone: "error",
      title: "Delivered, but not received",
      description:
        "The carrier marked this order delivered on Sep 24 at 3:42 PM. Check around your delivery spot and with neighbors, then report it if you still can't find it.",
    },
    timeline: [
      {
        status: "confirmed",
        label: "Order confirmed",
        state: "completed",
        timestamp: "Sep 20, 10:24 AM",
      },
      {
        status: "processing",
        label: "Processing",
        state: "completed",
        timestamp: "Sep 21, 2:15 PM",
      },
      {
        status: "shipped",
        label: "Shipped",
        state: "completed",
        timestamp: "Sep 22, 8:30 AM",
        note: "Departed Louisville, KY",
      },
      {
        status: "out-for-delivery",
        label: "Out for delivery",
        state: "completed",
        timestamp: "Sep 24, 9:12 AM",
      },
      {
        status: "delivered",
        label: "Delivered",
        state: "completed",
        timestamp: "Sep 24, 3:42 PM",
        note: "Left at front door",
      },
    ],
    product,
    details: withTracking,
    actions: [
      {
        label: "Contact support",
        kind: "contact-support",
      },
      {
        label: "Report delivery issue",
        kind: "report-issue",
        primary: true,
      },
    ],
  },

  "tracking-pending": {
    id: "ORD-89341",
    scenario: "tracking-pending",
    status: "processing",
    alert: {
      tone: "info",
      title: "Tracking not available yet",
      description:
        "Your order is confirmed and being prepared. Carrier tracking will appear here as soon as it's handed off for shipping.",
    },
    deliveryEstimate: { date: "Fri, Sep 27", time: "By 8:00 PM" },
    timeline: [
      {
        status: "confirmed",
        label: "Order confirmed",
        state: "completed",
        timestamp: "Sep 25, 11:20 AM",
      },
      {
        status: "processing",
        label: "Processing",
        state: "current",
        timestamp: "Sep 25, 12:05 PM",
        note: "Preparing your package",
      },
      { status: "shipped", label: "Shipped", state: "upcoming" },
      {
        status: "out-for-delivery",
        label: "Out for delivery",
        state: "upcoming",
      },
      { status: "delivered", label: "Delivered", state: "upcoming" },
    ],
    product,
    details: baseDetails,
    actions: [
      { label: "Contact support", kind: "contact-support", primary: true },
    ],
  },
};

export function getOrder(scenario: OrderScenario): Order | undefined {
  return orders[scenario];
}
