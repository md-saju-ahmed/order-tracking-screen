# Order Tracking Screen

A responsive order-tracking UI built with Next.js, React, TypeScript, and Tailwind CSS.

The screen supports three simulated order scenarios:

- Delayed
- Not received
- Tracking pending

It includes a status alert, delivery estimate, tracking timeline, collapsible order summary, and support actions.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

Use the scenario selector at the top of the page to switch between order states. Mock data is located in `src/data/order.ts`.

### Other Commands

```bash
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
├── app/                    # App Router entry and global styles
├── components/
│   ├── order-tracking/     # Order tracking components
│   └── ui/                 # Shared UI components
├── data/
│   └── order.ts            # Mock order data
├── lib/
│   └── utils.ts            # Shared utilities
└── types/
    └── order.ts            # Order-related types
```

## Current Limitations

- Order data is mocked; there is no real tracking API.
- Support actions are UI placeholders and do not send requests.
