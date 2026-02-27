"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NZ_QUICK_TAGS = [
  { label: "Auckland", type: "location" },
  { label: "Wellington", type: "location" },
  { label: "Christchurch", type: "location" },
  { label: "Remote", type: "location" },
  { label: "Data Science", type: "keyword" },
  { label: "Software Engineer", type: "keyword" },
  { label: "Product Manager", type: "keyword" },
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            NZ Job Aggregator
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/applications"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Applications
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One search. Every NZ job.
          </h1>
          <p className="mt-3 text-muted-foreground">
            SEEK, TradeMe & Indeed in one place — no more tab switching.
          </p>

          <div className="mt-10 w-full space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:rounded-xl sm:border sm:border-border sm:bg-card sm:p-2 sm:shadow-sm">
              <div className="relative flex-1">
                <Briefcase className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Job title or keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12 rounded-xl border-border pl-10"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Location (e.g. Auckland)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12 rounded-xl border-border pl-10"
                />
              </div>
              <Button
                size="lg"
                className="h-12 rounded-xl px-8"
                onClick={handleSearch}
              >
                <Search className="mr-2 size-4" />
                Search
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">Quick filters</p>
            <div className="flex flex-wrap justify-center gap-2">
              {NZ_QUICK_TAGS.map(({ label, type }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    type === "keyword"
                      ? setKeyword(label)
                      : setLocation(label)
                  }
                  className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3">
            <span className="inline-block size-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              <LiveCounter /> jobs aggregated
            </span>
            <span className="text-xs text-muted-foreground">updated live</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function LiveCounter() {
  const [count] = useState(1247);
  return <>{count.toLocaleString()}</>;
}
