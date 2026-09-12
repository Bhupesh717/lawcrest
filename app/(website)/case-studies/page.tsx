"use client";

import * as React from "react";
import { Scale, Trophy } from "lucide-react";
import { CaseStudyCard } from "@/components/website/case-study-card";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { CtaSection } from "@/components/website/cta-section";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useCaseStudies } from "@/lib/hooks/use-case-studies";

export default function CaseStudiesPage() {
  const [search, setSearch] = React.useState("");
  const [practiceArea, setPracticeArea] = React.useState("");

  const { data, isLoading } = useCaseStudies({
    search: search || undefined,
    limit: 50,
  });

  const studies = data?.data || [];

  const filteredStudies = React.useMemo(() => {
    if (!practiceArea) return studies;
    return studies.filter((s) =>
      s.practiceArea?.toLowerCase().includes(practiceArea.toLowerCase())
    );
  }, [studies, practiceArea]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
            <Trophy className="h-4 w-4" />
            <span>Proven Trial Record</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Significant Verdicts & <br />
            <span className="text-gold-gradient italic font-normal">
              Landmark Settlements.
            </span>
          </h1>
          <p className="text-lg text-[#B8B0A3] leading-relaxed font-light">
            Review detailed analyses of landmark trial victories, intellectual property defenses, and corporate crisis resolutions spanning three decades of high-stakes advocacy.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search verdicts by matter, party, or keyword..."
            className="sm:w-80"
          />

          <div className="w-full sm:w-64">
            <Select
              value={practiceArea}
              onChange={(e) => setPracticeArea(e.target.value)}
              placeholder="All Practice Groups"
            >
              <option value="">All Practice Groups</option>
              <option value="Commercial">Commercial Litigation</option>
              <option value="Intellectual">Intellectual Property</option>
              <option value="Securities">Securities & Financial</option>
              <option value="White-Collar">White Collar Defense</option>
            </Select>
          </div>
        </div>
      </section>

      {/* 2. Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : filteredStudies.length === 0 ? (
          <EmptyState
            title="No Case Studies Found"
            description="No verdicts matched your current filter criteria."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <CaseStudyCard key={study.id} caseStudy={study} />
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection
          title="Prepare Your Matter With Battle-Tested Litigators"
          subtitle="Explore how our trial strategies can be structured to protect your business assets and enterprise valuation."
        />
      </section>
    </div>
  );
}
