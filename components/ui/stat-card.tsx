import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  trend?: "up" | "down" | "neutral";
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  className?: string;
  prefix?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend,
  changeLabel = "vs last month",
  icon: Icon,
  description,
  className,
  prefix,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[#262018] bg-[#14110E] p-5 transition-all duration-300 hover:border-[#C9A45C]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#8F897F]">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            {prefix && <span className="text-xl text-[#C9A45C] font-serif">{prefix}</span>}
            <h3
              className="text-2xl lg:text-3xl font-serif font-bold text-[#F5F1E8] tracking-tight"
              suppressHydrationWarning
            >
              {value}
            </h3>
          </div>
        </div>
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#C9A45C]/20 bg-[#C9A45C]/10 text-[#D8B76A] transition-colors group-hover:border-[#C9A45C]/40 group-hover:bg-[#C9A45C]/20">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {(change !== undefined || description) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change !== undefined && (
            <div
              className={cn(
                "inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded",
                trend === "up" && "text-emerald-400 bg-emerald-500/10",
                trend === "down" && "text-rose-400 bg-rose-500/10",
                (!trend || trend === "neutral") && "text-[#8F897F] bg-white/5"
              )}
            >
              {trend === "up" && <ArrowUpRight className="h-3.5 w-3.5" />}
              {trend === "down" && <ArrowDownRight className="h-3.5 w-3.5" />}
              {trend === "neutral" && <Minus className="h-3 w-3" />}
              <span>{typeof change === "number" && change > 0 ? `+${change}%` : `${change}%`}</span>
            </div>
          )}
          <span className="text-[#8F897F] truncate">
            {description || changeLabel}
          </span>
        </div>
      )}

      {/* Subtle gold accent corner line */}
      <div className="absolute top-0 right-0 h-8 w-8 bg-gradient-to-bl from-[#C9A45C]/10 to-transparent pointer-events-none" />
    </div>
  );
}
