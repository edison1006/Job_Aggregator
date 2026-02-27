"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { JobCard, type JobSource } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILLS = ["Python", "SQL", "AWS", "React", "Node.js", "TypeScript"];

const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Data Analyst",
    company: "Xero",
    sources: ["SEEK", "TradeMe"] as JobSource[],
    salary: "$100k - $120k",
    postedAt: "2h ago",
    dedupCount: 2,
    description: `We're looking for a Senior Data Analyst to join our Analytics team. You'll work with **Python** and **SQL** daily, and experience with **AWS** and dbt is a plus. Strong stakeholder communication and the ability to turn data into insights are essential.`,
  },
  {
    id: "2",
    title: "Data Engineer",
    company: "Vend by Lightspeed",
    sources: ["SEEK"] as JobSource[],
    salary: "$110k - $130k",
    postedAt: "5h ago",
    description: `Join our data platform team. You'll build pipelines using **Python**, **SQL**, and **AWS**. Experience with **React** or **Node.js** for internal tools is beneficial.`,
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Trade Me",
    sources: ["SEEK", "Indeed", "TradeMe"] as JobSource[],
    salary: "$95k - $115k",
    postedAt: "1d ago",
    dedupCount: 3,
    description: `Work on our marketplace. We use **TypeScript**, **React**, and **Node.js**. Knowledge of **SQL** and cloud services (**AWS**) is preferred.`,
  },
];

function highlightSkills(text: string, skills: string[]) {
  const parts: { text: string; bold: boolean }[] = [];
  let remaining = text;
  const regex = new RegExp(
    `(${skills.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  let lastIndex = 0;
  let match;
  const re = new RegExp(regex.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    parts.push({ text: match[0], bold: true });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), bold: false });
  }
  return parts.length ? parts : [{ text, bold: false }];
}

export default function SearchPage() {
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_JOBS[0]?.id ?? null);
  const selected = useMemo(
    () => MOCK_JOBS.find((j) => j.id === selectedId),
    [selectedId]
  );

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
            <Link href="/applications" className="text-sm text-muted-foreground hover:text-foreground">
              Applications
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)]">
        <aside className="w-[min(400px,100%)] shrink-0 overflow-y-auto border-r border-border bg-card/50">
          <div className="p-3 space-y-2">
            {MOCK_JOBS.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                sources={job.sources}
                salary={job.salary}
                postedAt={job.postedAt}
                dedupCount={job.dedupCount}
                selected={selectedId === job.id}
                onSelect={() => setSelectedId(job.id)}
                onSave={() => {}}
              />
            ))}
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto bg-background">
          {selected ? (
            <div className="mx-auto max-w-2xl p-6">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {selected.sources.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "rounded-lg px-2 py-0.5 text-xs font-bold uppercase",
                      s === "SEEK" && "bg-[#1a73e8] text-white",
                      s === "TradeMe" && "bg-amber-500 text-white",
                      s === "Indeed" && "bg-red-600 text-white"
                    )}
                  >
                    {s}
                  </span>
                ))}
                {selected.salary && (
                  <span className="text-accent font-semibold">{selected.salary}</span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground">{selected.title}</h1>
              <p className="text-muted-foreground mt-1">{selected.company}</p>

              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-3">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlightSkills(selected.description ?? "", SKILLS).map((part, i) =>
                    part.bold ? (
                      <strong key={i} className="font-semibold text-foreground">
                        {part.text}
                      </strong>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button className="rounded-xl gap-2">
                  <BookmarkPlus className="size-4" />
                  Save to Dashboard
                </Button>
                <Button variant="outline" className="rounded-xl" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Apply on {selected.sources[0]}
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a job from the list
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
