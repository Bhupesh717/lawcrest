"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Scale, CheckCircle2, ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/website/hero-section";
import { StatCounter } from "@/components/website/stat-counter";
import { PracticeAreaCard } from "@/components/website/practice-area-card";
import { LawyerCard } from "@/components/website/lawyer-card";
import { CaseStudyCard } from "@/components/website/case-study-card";
import { BlogCard } from "@/components/website/blog-card";
import { TestimonialSlider } from "@/components/website/testimonial-slider";
import { CtaSection } from "@/components/website/cta-section";
import { ConsultationForm } from "@/components/website/consultation-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useServices } from "@/lib/hooks/use-services";
import { useLawyers } from "@/lib/hooks/use-lawyers";
import { useCaseStudies } from "@/lib/hooks/use-case-studies";
import { useBlogs } from "@/lib/hooks/use-blog";
import { useTestimonials } from "@/lib/hooks/use-testimonials";
import { Skeleton } from "@/components/ui/loading-skeleton";

export default function HomePage() {
  const { data: servicesData, isLoading: servicesLoading } = useServices();
  const { data: lawyersData, isLoading: lawyersLoading } = useLawyers({ limit: 4 });
  const { data: caseStudiesData, isLoading: caseStudiesLoading } = useCaseStudies({ limit: 3 });
  const { data: blogsData, isLoading: blogsLoading } = useBlogs({ limit: 3 });
  const { data: testimonialsData } = useTestimonials();

  const services = servicesData?.data || [];
  const lawyers = lawyersData?.data || [];
  const caseStudies = caseStudiesData?.data || [];
  const blogs = blogsData?.data || [];
  const testimonials = testimonialsData?.data || [];

  return (
    <div className="space-y-20 pb-20 -mt-20 md:-mt-24">
      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Statistical Proof Points */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <StatCounter />
      </section>

      {/* 3. Core Practice Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Areas of Practice"
            title="Strategic Defense & Advisory"
            subtitle="Deep institutional knowledge across disciplines where commercial outcomes and legal precedent intersect."
            className="mb-0"
          />
          <Link href="/practice-areas" className="shrink-0">
            <Button
              variant="outline"
              className="border-[#2E2519] bg-[#14110E] hover:border-[#C9A45C] hover:text-[#C9A45C] text-xs uppercase tracking-wider h-11 px-5"
            >
              <span>All 10 Practice Areas</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {servicesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <PracticeAreaCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Why LAWCREST / Trial Philosophy */}
      <section className="border-y border-[#262018] bg-[#0E0C09] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
                <ShieldCheck className="h-4 w-4" />
                <span>The LAWCREST Advantage</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
                Uncompromising Standards. <br />
                <span className="text-gold-gradient italic font-normal">
                  Decades of Courtroom Mastery.
                </span>
              </h2>
              <p className="text-base text-[#B8B0A3] leading-relaxed mb-8">
                Unlike mega-firms where high-profile cases are delegated to junior associates, LAWCREST guarantees senior partner trial involvement at every inflection point. We bring intellectual rigor, financial sophistication, and unwavering focus to every matter.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Direct Senior Partner Stewardship",
                    desc: "Your legal matter is directly handled and argued in court by nationally recognized trial litigators.",
                  },
                  {
                    title: "Multidimensional Litigation Strategy",
                    desc: "We coordinate trial defense with regulatory compliance, shareholder relations, and PR risk mitigation.",
                  },
                  {
                    title: "Relentless Technological Superiority",
                    desc: "Proprietary AI-assisted e-discovery, digital forensic verification, and predictive trial analytics.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#14110E] border border-[#221C16]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#F5F1E8]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#8F897F] mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side card with consultation form */}
            <div className="lg:pl-6">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Significant Verdicts & Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Record of Success"
            title="Benchmark Case Outcomes"
            subtitle="Review recent landmark trial verdicts, regulatory dismissals, and multi-billion-dollar transaction settlements."
            className="mb-0"
          />
          <Link href="/case-studies" className="shrink-0">
            <Button
              variant="outline"
              className="border-[#2E2519] bg-[#14110E] hover:border-[#C9A45C] hover:text-[#C9A45C] text-xs uppercase tracking-wider h-11 px-5"
            >
              <span>View All Verdicts</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {caseStudiesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((study) => (
              <CaseStudyCard key={study.id} caseStudy={study} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Senior Attorneys Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Our Counsel"
            title="Distinguished Advocates"
            subtitle="Former federal prosecutors, Supreme Court clerks, and Chambers-ranked litigators."
            className="mb-0"
          />
          <Link href="/lawyers" className="shrink-0">
            <Button
              variant="outline"
              className="border-[#2E2519] bg-[#14110E] hover:border-[#C9A45C] hover:text-[#C9A45C] text-xs uppercase tracking-wider h-11 px-5"
            >
              <span>Meet Full Roster</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {lawyersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lawyers.slice(0, 4).map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        )}
      </section>

      {/* 7. Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Testimonials"
          title="Reputations Defended. Enterprises Secured."
          subtitle="Direct perspectives from general counsels, corporate boards, and executives we have counseled through consequential challenges."
          align="center"
        />
        <TestimonialSlider testimonials={testimonials} />
      </section>

      {/* 8. Thought Leadership & Legal Insights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="Thought Leadership"
            title="Recent Legal Insights"
            subtitle="Authoritative analysis on emerging legal doctrines, Supreme Court rulings, and regulatory shifts."
            className="mb-0"
          />
          <Link href="/blog" className="shrink-0">
            <Button
              variant="outline"
              className="border-[#2E2519] bg-[#14110E] hover:border-[#C9A45C] hover:text-[#C9A45C] text-xs uppercase tracking-wider h-11 px-5"
            >
              <span>Explore All Insights</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {blogsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 9. Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection />
      </section>
    </div>
  );
}
