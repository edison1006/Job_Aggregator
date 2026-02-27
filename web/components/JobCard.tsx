"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SOURCE_COLORS: Record<string, string> = {
  SEEK: "bg-[#1a73e8] text-white",
  TradeMe: "bg-amber-500 text-white",
  Indeed: "bg-red-600 text-white",
};

export type JobSource = keyof typeof SOURCE_COLORS;

export interface JobCardProps {
  title: string;
  company: string;
  sources: JobSource[];
  salary?: string;
  postedAt?: string;
  dedupCount?: number;
  selected?: boolean;
  onSelect?: () => void;
  onSave?: () => void;
  className?: string;
}

export function JobCard({
  title,
  company,
  sources,
  salary,
  postedAt = "2h ago",
  dedupCount,
  selected,
  onSelect,
  onSave,
  className,
}: JobCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
      className={cn(
        "p-4 border border-slate-200 rounded-xl hover:shadow-lg transition-all bg-white group cursor-pointer text-left",
        selected && "ring-2 ring-primary border-primary shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-wrap gap-1">
          {sources.map((s) => (
            <span
              key={s}
              className={cn(
                "px-2 py-0.5 text-[10px] font-bold rounded uppercase",
                SOURCE_COLORS[s] ?? "bg-slate-100 text-slate-600"
              )}
            >
              {s}
            </span>
          ))}
          {dedupCount != null && dedupCount > 1 && (
            <Badge variant="secondary" className="text-[10px] font-medium">
              {dedupCount} sites
            </Badge>
          )}
        </div>
        {salary && (
          <span className="text-emerald-600 text-xs font-medium shrink-0 ml-2">
            {salary}
          </span>
        )}
      </div>
      <h3 className="font-bold text-slate-900 group-hover:text-primary truncate">
        {title}
      </h3>
      <p className="text-sm text-slate-500 mb-4">{company}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Posted {postedAt}</span>
        <Button
          size="sm"
          variant="default"
          className="rounded-lg text-xs h-8"
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
        >
          Save Job
        </Button>
      </div>
    </div>
  );
}
