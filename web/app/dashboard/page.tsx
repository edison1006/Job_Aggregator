"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FUNNEL_DATA = [
  { stage: "Jobs Found", value: 1247, fill: "#0F172A" },
  { stage: "Saved", value: 89, fill: "#334155" },
  { stage: "Applied", value: 34, fill: "#10B981" },
  { stage: "Interviews", value: 8, fill: "#059669" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", applied: 4, saved: 12 },
  { day: "Tue", applied: 2, saved: 8 },
  { day: "Wed", applied: 6, saved: 15 },
  { day: "Thu", applied: 3, saved: 7 },
  { day: "Fri", applied: 5, saved: 11 },
  { day: "Sat", applied: 0, saved: 3 },
  { day: "Sun", applied: 1, saved: 2 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            NZ Job Aggregator
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Search
            </Link>
            <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">
              Jobs
            </Link>
            <Link href="/applications" className="text-sm text-muted-foreground hover:text-foreground">
              Applications
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your job search funnel & activity</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-xl border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Application Funnel</CardTitle>
              <p className="text-sm text-muted-foreground">
                Total Jobs Found → Saved → Applied → Interviews
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {FUNNEL_DATA.map((item, i) => (
                  <div key={item.stage} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-medium text-foreground shrink-0">
                      {item.stage}
                    </span>
                    <div className="flex-1 h-8 rounded-xl bg-muted overflow-hidden flex">
                      <div
                        className={cn("h-full rounded-xl transition-all")}
                        style={{
                          width: `${(item.value / FUNNEL_DATA[0].value) * 100}%`,
                          backgroundColor: item.fill,
                        }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
              <p className="text-sm text-muted-foreground">
                Applications sent & jobs saved
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={WEEKLY_ACTIVITY}
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                    }}
                  />
                  <Bar dataKey="saved" name="Saved" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="applied" name="Applied" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
