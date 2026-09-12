"use client";

import * as React from "react";
import Link from "next/link";
import { Scale, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/website/cta-section";
import { Button } from "@/components/ui/button";
import { useServices } from "@/lib/hooks/use-services";
import { Skeleton } from "@/components/ui/loading-skeleton";

export default function PracticeAreasPage() {
  const { data: servicesData, isLoading } = useServices();
  const services = servicesData?.data || [];

  return (
    <div className="space-y-20 py-12 sm:py-16">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
            <Scale className="h-4 w-4" />
            <span>Core Competencies</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Nationally Recognized <br />
            <span className="text-gold-gradient italic font-normal">
              Practice Capabilities.
            </span>
          </h1>
          <p className="text-lg text-[#B8B0A3] leading-relaxed font-light">
            Our specialized practice groups provide surgical trial advocacy, corporate deal protection, and regulatory defense in sectors where scrutiny is intense and margins for error are zero.
          </p>
        </div>
      </section>

      {/* 2. Practice Areas Deep Dives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.slug || service.id}
                className="scroll-mt-28 rounded-2xl border border-[#262018] bg-[#14110E] p-8 sm:p-10 transition-all duration-300 hover:border-[#C9A45C]/40"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-[#C9A45C] border border-[#C9A45C]/30 px-2.5 py-0.5 rounded bg-[#C9A45C]/10">
                        PRACTICE {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      {service.caseCount && (
                        <span className="text-xs text-[#8F897F]">
                          • {service.caseCount}+ Completed Matters
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F1E8] mb-4">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#8F897F] leading-relaxed mb-6 max-w-3xl">
                      {service.description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="border-t border-[#221C16] pt-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C] mb-3">
                          Key Capabilities & Core Experience
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-[#B8B0A3]">
                              <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-72 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#221C16] pt-6 lg:pt-0 lg:pl-8 space-y-4">
                    <div className="bg-[#1A1612] p-4 rounded-xl border border-[#262018]">
                      <span className="text-[11px] uppercase tracking-wider text-[#8F897F] block">
                        Lead Practice Partners
                      </span>
                      <span className="font-serif text-sm font-bold text-[#F5F1E8] mt-1 block">
                        Senior Trial Counsel
                      </span>
                      <p className="text-[11px] text-[#8F897F] mt-1">
                        Ranked Band 1 by Chambers & Partners and Legal 500.
                      </p>
                    </div>

                    <Link href={`/contact?practice=${service.slug || service.id}`}>
                      <Button className="w-full bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-11">
                        <span>Consult on this Matter</span>
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection />
      </section>
    </div>
  );
}
