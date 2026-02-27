# NZ Job Aggregator MVP

One search. Every NZ job. — SEEK, TradeMe & Indeed in one place, with application tracking and dashboard.

## Design System

- **Primary**: `#0F172A` (Slate 900)
- **Accent**: `#10B981` (Emerald 500)
- **Surface**: `#F8FAFC` (Slate 50)
- **Font**: Geist (Next.js default)
- **Radius**: `rounded-xl` (12px)

## Frontend (Next.js + Shadcn/UI + Tailwind)

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Core pages

1. **Landing / Search** (`/`) — Centred search (keyword + location), NZ quick tags, live job counter.
2. **Search results** (`/search`) — Split view: left job list (source badges, dedup, salary), right detail (AI skill highlight, Save to Dashboard).
3. **Applications** (`/applications`) — Kanban: Draft → Applied → Interviewing → Offer/Reject; Calendar Sync for interviewing.
4. **Dashboard** (`/dashboard`) — Funnel (Jobs Found → Saved → Applied → Interviews) + weekly activity bar chart.

### Tech

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, Shadcn UI (New York)
- Recharts for funnel and weekly trend

## Backend (planned)

Node.js / Express API, Job Aggregator Engine, PostgreSQL, Meilisearch, Google OAuth & Calendar — see architecture diagram in repo.
