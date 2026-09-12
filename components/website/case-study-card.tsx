import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";
import type { CaseStudy } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function CaseStudyCard({
  caseStudy,
  className,
}: {
  caseStudy: CaseStudy;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-xl border border-[#262018] bg-[#14110E] p-7 transition-all duration-300 hover:border-[#C9A45C]/50 hover:bg-[#181410] hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="outline"
            className="border-[#C9A45C]/40 text-[#C9A45C] text-[10px] uppercase tracking-wider"
          >
            {caseStudy.practiceAreas?.[0] || "Commercial Litigation"}
          </Badge>
          {caseStudy.publishedAt && (
            <span className="text-xs text-[#8F897F] font-mono">
              {new Date(caseStudy.publishedAt).getFullYear()}
            </span>
          )}
        </div>

        {caseStudy.outcome && (
          <div className="mb-3">
            <span className="text-xs font-semibold text-[#8F897F] uppercase tracking-wider block">
              Result / Settlement
            </span>
            <span className="font-serif text-2xl lg:text-3xl font-bold text-[#D8B76A] tracking-tight">
              {caseStudy.outcome}
            </span>
          </div>
        )}

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8] group-hover:text-white transition-colors mb-3">
          {caseStudy.title}
        </h3>

        <p className="text-sm text-[#8F897F] leading-relaxed line-clamp-3 mb-6">
          {caseStudy.shortDescription}
        </p>

        {caseStudy.result && (
          <div className="flex items-start gap-2 text-xs text-[#B8B0A3] bg-[#1A1612] p-3 rounded-lg border border-[#262018] mb-6">
            <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
            <span className="line-clamp-2">{caseStudy.result}</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-[#221C16]">
        <Link
          href={`/case-studies/${caseStudy.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A45C] group-hover:text-[#D8B76A] transition-colors"
        >
          <span>Read Full Case Analysis</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
