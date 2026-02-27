"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { id: "draft", title: "Draft", color: "bg-slate-100 text-slate-600" },
  { id: "applied", title: "Applied", color: "bg-blue-100 text-blue-700" },
  { id: "interviewing", title: "Interviewing", color: "bg-amber-100 text-amber-700" },
  { id: "offer", title: "Offer / Reject", color: "bg-emerald-100 text-emerald-700" },
] as const;

type ColumnId = (typeof COLUMNS)[number]["id"];

interface AppCard {
  id: string;
  title: string;
  company: string;
  columnId: ColumnId;
  appliedAt?: string;
  hasInterview?: boolean;
}

const MOCK_APPLICATIONS: AppCard[] = [
  { id: "1", title: "Senior Data Analyst", company: "Xero", columnId: "applied", appliedAt: "3 days ago", hasInterview: false },
  { id: "2", title: "Data Engineer", company: "Vend", columnId: "interviewing", appliedAt: "1 week ago", hasInterview: true },
  { id: "3", title: "Product Analyst", company: "Trade Me", columnId: "draft", appliedAt: undefined, hasInterview: false },
  { id: "4", title: "BI Analyst", company: "Fletcher Building", columnId: "offer", appliedAt: "2 weeks ago", hasInterview: true },
];

function ApplicationCard({
  app,
  onCalendarSync,
}: {
  app: AppCard;
  onCalendarSync: (id: string) => void;
}) {
  return (
    <Card className="rounded-xl border-border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate">{app.title}</h3>
            <p className="text-sm text-muted-foreground">{app.company}</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 rounded-lg">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {app.appliedAt && (
          <p className="text-xs text-muted-foreground">Applied {app.appliedAt}</p>
        )}
        <div className="flex items-center gap-2">
          {app.columnId === "interviewing" && app.hasInterview && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg gap-1.5 text-xs"
              onClick={() => onCalendarSync(app.id)}
            >
              <Calendar className="size-3.5" />
              Calendar Sync
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApplicationsPage() {
  const [apps] = useState<AppCard[]>(MOCK_APPLICATIONS);

  const byColumn = COLUMNS.reduce(
    (acc, col) => {
      acc[col.id] = apps.filter((a) => a.columnId === col.id);
      return acc;
    },
    {} as Record<ColumnId, AppCard[]>
  );

  const handleCalendarSync = (id: string) => {
    console.log("Calendar sync", id);
  };

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
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground">Application Tracker</h1>
        <p className="text-muted-foreground mt-1">Drag to update status (coming soon)</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className={cn(
                "rounded-xl border border-border bg-card/50 p-4 min-h-[280px]",
                "flex flex-col"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={cn(
                    "rounded-lg px-2 py-1 text-xs font-semibold",
                    col.color
                  )}
                >
                  {col.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {byColumn[col.id].length}
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {byColumn[col.id].map((app) => (
                  <ApplicationCard
                    key={app.id}
                    app={app}
                    onCalendarSync={handleCalendarSync}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
