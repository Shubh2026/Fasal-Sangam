# Fasal Sangam

### AI-Powered Direct Farm-to-Market Network

Fasal Sangam is a proposed digital farm-to-market network designed to connect **farmers and Farmer Producer Organisations (FPOs)** directly with **consumers, retailers, distributors, and bulk buyers**.

The platform aims to reduce fragmentation between agricultural supply and market demand through:

- AI-assisted demand forecasting
- Smart buyer-supplier matching
- Supply aggregation across multiple farmers/FPOs
- Transparent pricing
- Harvest-window coordination
- Coordinated logistics
- Digital order tracking
- Network-level analytics

> **Important:** This repository contains a working demonstration prototype. The production architecture and capabilities described in this README represent the proposed final solution and are not claimed to be fully implemented in the current prototype.

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [Fasal Sangam's Approach](#2-fasal-sangams-approach)
3. [What This Repository Contains](#3-what-this-repository-contains)
4. [Prototype Features](#4-prototype-features)
5. [Smart Matching](#5-smart-matching)
6. [Supply Aggregation](#6-supply-aggregation)
7. [AI Demand Forecasting](#7-ai-demand-forecasting)
8. [Transparent Pricing](#8-transparent-pricing)
9. [Harvest-Window Coordination](#9-harvest-window-coordination)
10. [Logistics Coordination](#10-logistics-coordination)
11. [Order Lifecycle](#11-order-lifecycle)
12. [Platform / Admin Workspace](#12-platform--admin-workspace)
13. [Three-Sided Ecosystem](#13-three-sided-ecosystem)
14. [Proposed Production System](#14-proposed-production-system)
15. [Proposed Production Architecture](#15-proposed-production-architecture)
16. [Proposed Production Technology Stack](#16-proposed-production-technology-stack)
17. [Security and Privacy in Production](#17-security-and-privacy-in-production)
18. [Privacy by Design](#18-privacy-by-design)
19. [Multilingual Experience](#19-multilingual-experience)
20. [Accessibility](#20-accessibility)
21. [Prototype Data & Authentication](#21-prototype-data--authentication)
22. [Prototype Demo Walkthrough](#22-prototype-demo-walkthrough)
23. [Prototype Limitations](#23-prototype-limitations)
24. [Prototype vs Production — At a Glance](#24-prototype-vs-production--at-a-glance)
25. [Deployment Vision](#25-deployment-vision)
26. [Development Roadmap](#26-development-roadmap)
27. [Why Fasal Sangam?](#27-why-fasal-sangam)
28. [Key Differentiators](#28-key-differentiators)
29. [Judge-Facing Note](#29-judge-facing-note)
30. [Tech Stack](#30-tech-stack)
31. [Getting Started](#31-getting-started)
32. [Main Routes](#32-main-routes)
33. [Project Structure](#33-project-structure)
34. [Team](#34-team)
35. [Final Vision](#35-final-vision)

---

## 1. The Problem

Agricultural markets often operate through fragmented supply and demand.

**Farmers may face:**
- Limited access to reliable buyers
- Uncertain future demand
- Price fluctuations
- Difficulty selling smaller quantities to large buyers
- Limited visibility into market requirements
- Harvest timing mismatches
- Transportation inefficiencies
- Dependence on multiple intermediaries

**At the same time, buyers may face:**
- Fragmented supplier networks
- Difficulty sourcing large quantities consistently
- Inconsistent quality and availability
- Price opacity
- Difficulty coordinating multiple suppliers
- Higher logistics complexity

The result is a gap between:

**What farmers are going to produce** and **What the market is going to need.**

---

## 2. Fasal Sangam's Approach

Fasal Sangam acts as a digital coordination layer between agricultural supply and market demand.

### Conceptual flow

```
Farmers / FPOs
      │
      ▼
Supply Listing
      │
      ▼
Fasal Sangam
      │
      ├── Demand Forecasting
      ├── Smart Matching
      ├── Supply Aggregation
      ├── Price Transparency
      └── Logistics Coordination
      │
      ▼
Consumers / Bulk Buyers
```

The goal is to connect:

**The right produce → with the right buyer → at the right time → with transparent pricing and coordinated delivery.**

---

## 3. What This Repository Contains

This repository contains a working frontend prototype designed to demonstrate the proposed Fasal Sangam workflow and user experience.

The prototype uses realistic simulated agricultural data, primarily representing the Punjab/Chandigarh region.

It demonstrates three major stakeholder experiences:

- Farmer / FPO
- Buyer
- Platform Administrator

---

## 4. Prototype Features

### Farmer / FPO Workspace

The prototype demonstrates:
- Farmer dashboard
- Produce listing
- Upcoming harvest information
- AI market insights
- Demand forecasts
- Smart buyer matches
- Match scores
- Order management
- Earnings information
- Farmer contribution to aggregated orders

Example:
```
Tomato Harvest
750 kg
Grade A
Harvest Window: 12–15 September
```

The prototype can then demonstrate how this supply may be matched with relevant buyer demand.

### Buyer Workspace

The buyer experience includes:
- Buyer dashboard
- Agricultural marketplace
- Crop/product discovery
- Supply details
- Search and filtering
- Buyer requirements
- AI-assisted matching
- Aggregated supply
- Order confirmation
- Order tracking
- Demand insights

Example buyer requirement:
```
Crop: Tomato
Quantity: 1,000 kg
Quality: Grade A
Delivery: 15 September
Location: Chandigarh
Maximum Price: ₹34/kg
```

---

## 5. Smart Matching

One of the central concepts demonstrated by the prototype is intelligent matching between buyer requirements and available agricultural supply.

The conceptual matching process considers:
- Crop
- Required quantity
- Available quantity
- Quality/grade
- Harvest window
- Location
- Distance
- Price
- Availability

Example:
```
Buyer Requirement
Tomato — 1,000 kg

Potential Supply
Farmer A     → 350 kg
Farmer B     → 250 kg
Patiala FPO  → 400 kg

Total        → 1,000 kg
```

The prototype presents a simulated match score such as:
```
94% Match
```

> Match scores shown in the prototype are simulated for demonstration and do not represent a production ML model.

---

## 6. Supply Aggregation

A key differentiator of Fasal Sangam is that large buyer requirements do not necessarily have to be fulfilled by a single farmer.

The platform can conceptually aggregate compatible supply from multiple farmers and FPOs.

```
350 kg ─┐
250 kg ─┼──► 1,000 kg Combined Order ──► Buyer
400 kg ─┘
```

This can help bridge the gap between:

**Small and fragmented farm supply** and **Large and structured buyer demand.**

In the production system, aggregation would be governed by availability, quality, harvest window, location, pricing rules, and other operational constraints.

---

## 7. AI Demand Forecasting

The proposed production platform can use historical and current marketplace signals to estimate future demand.

The prototype demonstrates this concept using simulated forecast data.

Example:
```
Crop: Tomato

Current Weekly Demand:   820 kg
Forecast Demand:       1,050 kg
Expected Trend:          +28%
```

The interface can then provide a recommendation such as:

> "Demand is trending upward. Farmers with upcoming tomato harvests may consider listing their produce."

The production version could incorporate signals such as:
- Historical orders
- Seasonal patterns
- Regional demand
- Crop trends
- Marketplace activity
- Buyer requirements
- Historical price/demand relationships

> The prototype's forecasts are simulated and should not be interpreted as production predictions.

---

## 8. Transparent Pricing

Fasal Sangam is designed to make the economics of a transaction easier to understand.

The production platform can expose an appropriate breakdown such as:
```
Market Reference       ₹34/kg

Farmer Receives        ₹30/kg
Logistics               ₹2/kg
Other Applicable Fees   ₹0–2/kg

Buyer Pays              ₹34/kg
```

The exact production pricing model would depend on the cooperative, service model, logistics costs, applicable taxes/fees, and commercial agreements.

The objective is to avoid opaque pricing and provide stakeholders with greater visibility into how the final transaction value is formed.

---

## 9. Harvest-Window Coordination

Farmers can conceptually indicate upcoming harvest availability rather than only listing produce after it has already been harvested.

Example:
```
Tomato
Expected Quantity: 750 kg
Harvest Window: 12–15 September
Quality: Grade A
Location: Punjab
```

This allows the proposed platform to connect upcoming supply with future buyer requirements.

This can improve planning and reduce situations where produce reaches the market without a suitable buyer already identified.

---

## 10. Logistics Coordination

The production vision includes coordinated movement of aggregated orders.

For example:
```
Farmer / Farm A
       │
       ▼
Farmer / Farm B
       │
       ▼
FPO Collection Centre
       │
       ▼
Bulk Buyer
```

The prototype demonstrates this through a simulated route.

Example:
```
Total Quantity: 1,000 kg
Optimized Route: 68 km
Estimated Arrival: 3:30 PM
```

The production system could use:
- Pickup locations
- Collection centres
- Delivery destinations
- Vehicle capacity
- Quantity
- Time windows
- Distance
- Route constraints

to generate more efficient logistics plans.

> Routes and logistics information in the prototype are simulated.

---

## 11. Order Lifecycle

The prototype demonstrates an end-to-end order journey:

```
Order Placed
     ↓
Farmers Matched
     ↓
Supply Aggregated
     ↓
Produce Prepared
     ↓
Pickup Scheduled
     ↓
In Transit
     ↓
Delivered
```

The production system can maintain a complete status history for each order.

This provides visibility to:
- Farmers
- FPOs
- Buyers
- Platform administrators
- Logistics operators

---

## 12. Platform / Admin Workspace

The administrator workspace provides a network-level view of the platform.

The prototype demonstrates:
- Supply overview
- Demand overview
- Matching performance
- Active orders
- Logistics overview
- Demand forecasting
- Network analytics

Example metrics:
- Active Farmers
- Active Buyers
- Produce Listed
- Orders
- Matched Volume
- Match Rate
- Active Logistics

The production administrator system can additionally support operational controls, audit logs, issue resolution, user management, and platform configuration.

---

## 13. Three-Sided Ecosystem

Fasal Sangam is designed as a three-sided digital ecosystem.

```
                 FASAL SANGAM
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
       FARMERS      BUYERS      ADMIN
        / FPOs
```

**Farmers / FPOs** — Provide agricultural supply.

**Buyers** — Provide market demand.

**Platform / Admin** — Coordinates the network and provides visibility.

The platform's value increases as supply and demand become more connected.

---

## 14. Proposed Production System

The final production version would go significantly beyond the current prototype. It would introduce:

### Real Authentication
- Mobile OTP verification
- Secure sessions
- Role-based access control
- Account recovery
- Device/session management

### Real Farmer/FPO Profiles
- Verified farmer accounts
- FPO profiles
- Crop/supply records
- Location information
- Harvest information
- Quality information

### Real Buyer Accounts
- Retailers
- Distributors
- Institutional buyers
- Bulk purchasers
- Consumer-facing buyers where applicable

### Production Marketplace
- Real listings
- Search
- Filters
- Availability
- Pricing
- Quality
- Harvest windows
- Location-aware discovery

### Production Matching

A matching service can evaluate:
```
Crop + Quantity + Quality + Harvest Window + Location + Price + Availability
```
to generate suitable supply recommendations.

### Production Supply Aggregation

The platform can combine compatible supply from multiple farmers/FPOs while respecting:
- Quality requirements
- Quantity constraints
- Harvest windows
- Geographic constraints
- Buyer pricing
- Logistics capacity

### Production Logistics

Potential integration with logistics partners and route optimization services can provide:
- Pickup scheduling
- Collection centres
- Vehicle assignment
- Route planning
- Delivery status
- Proof of delivery

### Production Payments

A compliant payment provider can be integrated for:
- Buyer payments
- Farmer payouts
- Transaction records
- Invoices
- Refunds where applicable

> Sensitive payment credentials should remain with the payment provider rather than being stored directly by SahyogSetu/Fasal Sangam.

---

## 15. Proposed Production Architecture

A practical production architecture can evolve from the current prototype.

```
                         USERS
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       FARMERS           BUYERS           ADMIN
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                    NEXT.JS APPLICATION
                           │
                           ▼
                     API / SERVER LAYER
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     Marketplace      Matching Engine    Order Service
          │                │                │
          ├────────────────┼────────────────┤
          │                │                │
          ▼                ▼                ▼
      PostgreSQL       AI/ML Services    Logistics
          │                                 │
          └──────────────┬──────────────────┘
                         ▼
                 External Integrations
```

---

## 16. Proposed Production Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Accessible reusable component system

### Backend

Initially:
- Next.js server/API capabilities
- TypeScript

As scale increases, specialized services can be separated where appropriate.

Potential backend responsibilities:
- Authentication
- User management
- Farmer/FPO management
- Buyer management
- Marketplace
- Matching
- Orders
- Payments
- Notifications
- Logistics
- Analytics

### Database
- PostgreSQL
- Drizzle ORM

### AI / ML

Dedicated AI/ML services can be introduced for:
- Demand forecasting
- Supply-demand matching
- Recommendation systems
- Logistics optimization
- Anomaly detection

Python-based ML services can be used where dedicated model workloads justify them.

### Visualization
- Recharts
- Interactive dashboards
- Geographic visualization

### Storage

Secure object storage for:
- Crop images
- Farmer/FPO documents
- Verification records
- Other authorized files

---

## 17. Security and Privacy in Production

Because the production platform may handle personal, financial, location, and business information, security should be designed from the beginning.

Production requirements include:
- HTTPS
- Secure authentication
- Role-based authorization
- Server-side permission checks
- Input validation
- Rate limiting
- OTP abuse protection
- Secure cookies
- Secret management
- Database access controls
- Encryption in transit
- Appropriate encryption for sensitive data
- Audit logging
- Secure file uploads
- Backup and recovery
- Monitoring and alerting

> Sensitive information should only be accessible to authorized roles. Farmer identity/verification documents should never be publicly exposed. API keys, database credentials, payment secrets, and other sensitive credentials must never be committed to source control.

---

## 18. Privacy by Design

The production platform should follow privacy-by-design principles. It should:
- Collect only necessary data
- Explain why data is collected
- Restrict access according to role
- Minimize unnecessary data sharing
- Protect sensitive documents
- Maintain appropriate audit records
- Provide appropriate account/data controls
- Follow applicable Indian data-protection requirements

> Government systems, agricultural databases, identity systems, and cooperative registries should only be integrated through authorized official mechanisms.

---

## 19. Multilingual Experience

Fasal Sangam is intended to support users across different levels of digital literacy.

The production platform should support multiple Indian languages.

Initial languages can include:
- English
- Hindi
- Punjabi

Additional regional languages can be introduced according to deployment location.

The farmer-facing interface should use simple and understandable terminology.

---

## 20. Accessibility

The production interface should support:
- Responsive layouts
- Clear typography
- High contrast
- Keyboard navigation
- Accessible forms
- Semantic HTML
- Screen-reader-friendly labels
- Clear validation messages
- Touch-friendly controls

The platform should be usable on both smartphones and desktop devices.

---

## 21. Prototype Data & Authentication

The current prototype is intentionally demo-only.

Authentication is mocked through role selection.

Marketplace, supply, forecast, matching, pricing, order, and logistics data are simulated locally.

No real:
- Farmer accounts
- Buyer accounts
- Payments
- Government integrations
- Identity verification
- SMS systems
- Logistics providers
- Live agricultural databases

are connected to the prototype.

This allows the prototype to demonstrate the workflow without requiring production credentials or external services.

---

## 22. Prototype Demo Walkthrough

The recommended prototype demonstration is:

### Step 1 — Farmer

Open the Farmer workspace.

Review:
- Dashboard
- Upcoming harvest
- Demand insight

List an upcoming tomato harvest.

Example:
```
Tomato
350 kg
Grade A
Upcoming Harvest
```

### Step 2 — Smart Matching

Open Smart Matches. Show the farmer's potential buyer match.

### Step 3 — Buyer

Switch to the Buyer workspace.

Create:
```
Tomato
1,000 kg
Grade A
Chandigarh
15 September
```

### Step 4 — Supply Aggregation

Show the platform combining supply:
```
350 kg
+
250 kg
+
400 kg
=
1,000 kg
```

### Step 5 — Pricing

Show the transparent price breakdown.

### Step 6 — Order

Confirm the aggregated order.

### Step 7 — Logistics

Open tracking and show the simulated collection/delivery route.

### Step 8 — Admin

Open the Admin workspace and show:
- Demand
- Supply
- Matching
- Orders
- Logistics
- Network analytics

This demonstrates the complete concept in a short walkthrough.

---

## 23. Prototype Limitations

The following features are intentionally simulated:
- Authentication
- OTP verification
- Farmer/FPO verification
- Buyer verification
- Payments
- Government integrations
- Live market data
- Live demand feeds
- Real-time GPS
- Logistics-provider integration
- Production database
- Production AI models
- Real notifications
- Real transaction settlement

The prototype is therefore a demonstration of:

**Product concept + workflow + UX + system vision**

rather than a claim of production deployment.

---

## 24. Prototype vs Production — At a Glance

| Capability | Prototype | Proposed Production |
|---|---|---|
| Farmer workspace | ✓ | ✓ |
| Buyer workspace | ✓ | ✓ |
| Admin workspace | ✓ | ✓ |
| Marketplace | Simulated | Real |
| Authentication | Mocked | Secure OTP/auth |
| Farmer verification | Simulated | Real verification workflow |
| Demand forecasting | Simulated | Production ML/data pipeline |
| Smart matching | Simulated | Matching service |
| Supply aggregation | Simulated | Production aggregation engine |
| Pricing | Demonstration | Configurable production pricing |
| Orders | Simulated | Persistent database |
| Payments | Mocked | Payment-provider integration |
| Logistics | Simulated | Logistics integration/optimization |
| Database | Local/mock data | PostgreSQL |
| Notifications | Simulated | Production notification providers |
| Government integrations | None | Only through authorized APIs |
| Analytics | Demo data | Production analytics |
| Security | Prototype-level | Production security controls |

---

## 25. Deployment Vision

A practical initial production deployment can use:
```
Next.js Frontend
        │
        ▼
      Vercel
        │
        ▼
Backend / API
        │
        ├── Render / Railway
        │
        ▼
Managed PostgreSQL
```

Additional infrastructure can be added for:
- Object storage
- AI/ML services
- Notifications
- Payment processing
- Monitoring
- Logging
- Analytics

The exact cloud provider can change based on cost, scale, organizational requirements, and deployment constraints.

For the current hackathon prototype, lightweight deployment is preferred.

---

## 26. Development Roadmap

### Phase 1 — Working Prototype
- Farmer workspace
- Buyer workspace
- Admin workspace
- Marketplace UI
- Demand forecasting UI
- Smart matching UI
- Supply aggregation UI
- Transparent pricing
- Order lifecycle
- Logistics visualization
- Analytics dashboards
- Responsive interface

### Phase 2 — Production Foundation
- PostgreSQL integration
- Secure authentication
- Role-based authorization
- Farmer/FPO onboarding
- Buyer onboarding
- Persistent marketplace
- Secure document storage
- Production API structure
- Audit logging

### Phase 3 — Marketplace & Operations
- Real supply listings
- Buyer requirements
- Availability management
- Smart matching
- Supply aggregation
- Booking/order lifecycle
- Notifications
- Cooperative/FPO operations
- Logistics coordination

### Phase 4 — Payments & Trust
- Payment integration
- Farmer payouts
- Invoices
- Verification workflows
- Reviews
- Dispute handling
- Fraud/abuse prevention

### Phase 5 — Intelligence & Scale
- Production demand forecasting
- Advanced matching
- Logistics optimization
- Recommendation engine
- Multilingual assistant
- Advanced analytics
- Monitoring and observability
- Regional expansion

---

## 27. Why Fasal Sangam?

Fasal Sangam is not simply a digital marketplace for agricultural products.

Its proposed value comes from connecting multiple fragmented processes into one coordinated network:

```
Fragmented Farm Supply
          ↓
      Fasal Sangam
          ↓
   Demand Intelligence
          ↓
    Smart Matching
          ↓
  Supply Aggregation
          ↓
 Transparent Pricing
          ↓
Logistics Coordination
          ↓
      Buyer Market
```

Instead of treating farmers, buyers, and logistics as disconnected systems, Fasal Sangam aims to coordinate them through a single digital platform.

---

## 28. Key Differentiators

**1. Demand-led agriculture**

Instead of only asking: *"What has the farmer produced?"* — the platform also asks: *"What is the market likely to need?"*

**2. Aggregated supply**

Small quantities from multiple farmers/FPOs can potentially fulfil larger requirements.

**3. Harvest-window matching**

Upcoming harvests can be connected with future buyer requirements.

**4. Transparent pricing**

Stakeholders can see the major components of the transaction.

**5. Coordinated logistics**

Compatible supply can be grouped to improve delivery coordination.

**6. Network-level intelligence**

Administrators can see where supply, demand, matching, and logistics stand across the network.

---

## 29. Judge-Facing Note

This project should be evaluated in two layers.

### What the prototype demonstrates

The prototype demonstrates the intended:
- User experience
- Farmer workflow
- Buyer workflow
- Admin workflow
- Demand-insight concept
- Matching concept
- Supply aggregation
- Transparent pricing
- Order lifecycle
- Logistics visualization

### What the proposed production system provides

The final system is envisioned to provide:
- Real verified users
- Secure authentication
- Persistent data
- Real marketplace transactions
- Production AI/ML
- Secure payments
- Verified farmer/FPO records
- Logistics integrations
- Notifications
- Analytics
- Security and privacy controls
- Scalable infrastructure

This distinction is intentional. The prototype demonstrates the product and workflow, while the production architecture describes how the platform can be developed into a deployable real-world system.

---

## 30. Tech Stack

### Current Prototype
- Next.js 16
- App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Recharts
- Drizzle ORM
- PostgreSQL configuration
- Local/mock application data

### Proposed Production

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**
- Next.js server/API layer initially
- Node.js/TypeScript services where separation is justified

**Database**
- PostgreSQL
- Drizzle ORM

**AI/ML**
- Python-based services where required
- Open-source ML libraries where practical
- Production model/API provider selected based on cost, privacy, latency, and reliability

**Infrastructure**
- Vercel
- Render/Railway or equivalent
- Managed PostgreSQL
- Object storage
- Monitoring and logging

The production architecture should favor practical, scalable, cost-efficient, and open-source components wherever possible.

---

## 31. Getting Started

### Requirements
- Node.js 20 or newer
- npm

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm run start
```

### Available Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

---

## 32. Main Routes

| Area | Route |
|---|---|
| Landing page | `/` |
| Role selection | `/login` |
| Farmer dashboard | `/farmer/dashboard` |
| Buyer dashboard | `/buyer/dashboard` |
| Admin dashboard | `/admin/dashboard` |

Additional farmer, buyer, matching, order, logistics, forecasting, and admin pages are accessible through the respective workspace navigation.

---

## 33. Project Structure

```
src/
  app/             Next.js routes and layouts
  components/      Shared cards, charts, maps, shell, and workflow components
  data/             Mock crops, forecasts, supply, buyer, and order data
  db/               Drizzle schema and database entry point
  lib/              Shared utilities and localization helpers

public/
  images/           Crop and farm imagery used by the prototype
```

---

## 34. Team

**Team Neural**

Project: Fasal Sangam

Prototype: Working Demonstration

---

## 35. Final Vision

Fasal Sangam aims to build a more connected agricultural marketplace where:

- Farmers know where demand is going
- Buyers know where supply is coming from
- Small supplies can be combined into larger orders
- Prices are easier to understand
- Harvests can be planned around demand
- Logistics can be coordinated

and

**the entire transaction becomes more transparent and data-driven.**

---

**Fasal Sangam**

*From farm surplus to market demand — connected intelligently.*
