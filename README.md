# Fasal Sangam

Fasal Sangam is an AI-powered direct farm-to-market network prototype. It connects farmers and FPOs with buyers through demand insights, supply aggregation, transparent pricing, matching, and coordinated logistics.

## Prototype demo

This is a frontend prototype with realistic simulated Punjab-belt data. Authentication is intentionally mocked: choose a role on the login screen to enter its workflow.

Suggested walkthrough:

1. Open the Farmer workspace and list an upcoming tomato harvest.
2. Switch to Buyer from the application header.
3. Create a 1,000 kg requirement and review the matching supply.
4. Open the Admin workspace to inspect demand, supply, matching, orders, and logistics views.

## Features

- Farmer and FPO produce listings, demand insights, matches, orders, and earnings
- Buyer marketplace, product details, demand requests, orders, and tracking
- Admin network dashboards for supply, demand, matching, logistics, and orders
- Demand forecasting and visual network charts
- Supply aggregation and order price breakdowns
- Simulated matching and route optimization workflows
- Responsive interface for desktop and mobile screens

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Lucide React icons
- Recharts
- Drizzle ORM with PostgreSQL configuration available for future persistence

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run ESLint
npm run typecheck # Run the TypeScript compiler without emitting files
```

## Main routes

| Area | Route |
| --- | --- |
| Landing page | `/` |
| Role selection | `/login` |
| Farmer dashboard | `/farmer/dashboard` |
| Buyer dashboard | `/buyer/dashboard` |
| Admin dashboard | `/admin/dashboard` |

Additional role pages are available from each workspace's navigation.

## Project structure

```text
src/
  app/          Next.js routes and layouts
  components/   Shared cards, charts, maps, shell, and workflow components
  data/         Mock crops, forecasts, supply, buyer, and order data
  db/           Drizzle schema and database entry point
  lib/          Shared utilities and localization helpers
public/images/  Crop and farm imagery used by the prototype
```

## Data and authentication

The current experience is intentionally demo-only. Role selection is stored in the client-side app provider, and all marketplace, forecasting, matching, and order data is mocked locally. No real credentials or production transactions are handled.