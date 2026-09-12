"use client";

import * as React from "react";
import { Scale } from "lucide-react";
import { LawyerCard } from "@/components/website/lawyer-card";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/website/cta-section";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useLawyers } from "@/lib/hooks/use-lawyers";

export default function LawyersPage() {
  const [search, setSearch] = React.useState("");
  const [specialization, setSpecialization] = React.useState("");

  const { data, isLoading } = useLawyers({
    search: search || undefined,
    limit: 50,
  });

  const lawyers = data?.data || [];

  const filteredLawyers = React.useMemo(() => {
    if (!specialization) return lawyers;
    return lawyers.filter((lawyer) =>
      lawyer.specializations?.some((s) =>
        s.toLowerCase().includes(specialization.toLowerCase())
      )
    );
  }, [lawyers, specialization]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
            <Scale className="h-4 w-4" />
            <span>Trial Attorneys & Legal Strategists</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Partners in Leadership. <br />
            <span className="text-gold-gradient italic font-normal">
              Advocates in Court.
            </span>
          </h1>
          <p className="text-lg text-[#B8B0A3] leading-relaxed font-light">
            Our roster comprises premier trial attorneys, former federal prosecutors, and appellate advocates renowned for securing defining victories in high-stakes venues.
          </p>
        </div>

        {/* Filters bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search attorneys by name or expertise..."
            className="sm:w-80"
          />

          <div className="w-full sm:w-64">
            <Select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="All Specializations"
            >
              <option value="">All Specializations</option>
              <option value="Corporate">Corporate & Governance</option>
              <option value="Litigation">Commercial Litigation</option>
              <option value="White-Collar">White Collar Defense</option>
              <option value="Intellectual Property">Intellectual Property</option>
              <option value="Appellate">Appellate Advocacy</option>
            </Select>
          </div>
        </div>
      </section>

      {/* 2. Grid of Lawyers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <CardSkeleton count={8} />
        ) : filteredLawyers.length === 0 ? (
          <EmptyState
            title="No Attorneys Found"
            description="Try clearing your search query or selecting a different practice area filter."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection
          title="Connect Directly With A Lead Litigator"
          subtitle="Our intake committee coordinates immediately with practice heads to evaluate conflicts and schedule preliminary consultations."
        />
      </section>
    </div>
  );
}
