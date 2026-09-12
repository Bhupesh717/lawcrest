"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  Scale,
  Calendar,
  Building,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useCaseStudy } from "@/lib/hooks/use-case-studies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { CtaSection } from "@/components/website/cta-section";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useCaseStudy(id);

  const study = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (isError || !study) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorState
          title="Case Study Not Found"
          message="The case study you requested could not be located."
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link href="/case-studies">
            <Button variant="outline" className="border-[#2E2519] text-[#C9A45C]">
              Return to All Verdicts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F897F] hover:text-[#C9A45C] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Verdicts & Case Studies</span>
        </Link>
      </div>

      {/* Hero Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="outline"
              className="border-[#C9A45C]/40 text-[#C9A45C] uppercase tracking-wider text-xs"
            >
              {study.practiceAreas?.[0] || "Commercial Litigation"}
            </Badge>
            {study.publishedAt && (
              <span className="text-xs text-[#8F897F] font-mono">
                Decided {new Date(study.publishedAt).getFullYear()}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            {study.title}
          </h1>

          {/* Key Outcome Highlight Banner */}
          {study.outcome && (
            <div className="p-6 rounded-xl border border-[#C9A45C]/40 bg-[#17130F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8F897F] block">
                  Final Verdict / Client Recovery
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D8B76A] tracking-tight">
                  {study.outcome}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#E6E0D5]">
                <Shield className="h-4 w-4 text-[#C9A45C]" />
                <span>Confirmed by Final Appellate Mandate</span>
              </div>
            </div>
          )}
        </div>

        {/* Narrative Sections */}
        <div className="space-y-10 border-t border-[#221C16] pt-8 text-sm sm:text-base text-[#B8B0A3] leading-relaxed">
          {/* Executive Summary */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F5F1E8] mb-3">
              Executive Summary
            </h2>
            <p className="mb-4">{study.shortDescription}</p>
          </div>

          {/* The Legal Challenge */}
          {study.challenge && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F5F1E8] mb-3">
                The Legal & Strategic Challenge
              </h2>
              <p className="mb-4">{study.challenge}</p>
            </div>
          )}

          {/* Strategy & Courtroom Execution */}
          {study.approach && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#F5F1E8] mb-3">
                Trial Strategy & Courtroom Execution
              </h2>
              <p className="mb-4">{study.approach}</p>
            </div>
          )}

          {/* Key Precedents & Takeaways */}
          {study.result && (
            <div className="p-6 rounded-xl border border-[#2E2519] bg-[#14110E]">
              <h3 className="font-serif text-lg font-bold text-[#C9A45C] mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#C9A45C]" />
                <span>Strategic Takeaway & Precedent Value</span>
              </h3>
              <p className="text-sm text-[#E6E0D5]">{study.result}</p>
            </div>
          )}
        </div>

        {/* Action Link to Contact */}
        <div className="pt-8 border-t border-[#221C16] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-[#8F897F]">
            Facing an equivalent corporate dispute or trial date?
          </span>
          <Link href="/contact">
            <Button className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-11 px-6">
              <span>Consult On Similar Matter</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </article>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection />
      </section>
    </div>
  );
}
