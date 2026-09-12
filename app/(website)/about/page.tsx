import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Scale, Users, Trophy, CheckCircle2, ChevronRight, Landmark } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/website/cta-section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About The Firm | LAWCREST Professional Corporation",
  description:
    "Founded in 1988, LAWCREST is premier independent counsel for corporations, boards, and individuals facing pivotal legal challenges.",
};

const firmPillars = [
  {
    title: "Senior Attention at Every Stage",
    description:
      "We reject the leverage-heavy pyramid model. Every LAWCREST client benefits from the direct strategic oversight of senior trial partners who prepare every matter as if it is going to a jury.",
  },
  {
    title: "Commercial Fluency",
    description:
      "Legal advice in a vacuum is useless. We thoroughly understand our clients' balance sheets, market dynamics, regulatory pressures, and reputational stakes before formulating strategy.",
  },
  {
    title: "Intellectual Rigor",
    description:
      "We dissect complex statutory frameworks and dense factual records to uncover decisive leverage points that adversaries overlook.",
  },
  {
    title: "Trial-Ready Credibility",
    description:
      "Adversaries settle on favorable terms because they know our attorneys are experienced, battle-tested, and fully prepared to proceed to verdict.",
  },
];

const milestones = [
  { year: "1988", title: "Foundation in New York", desc: "Established by three former federal prosecutors focusing on white-collar defense and corporate fraud." },
  { year: "1997", title: "Cross-Border Expansion", desc: "Launched London and Geneva liaison desks to service multi-jurisdictional financial litigation." },
  { year: "2008", title: "Global Financial Crisis Defense", desc: "Successfully represented major institutions in sovereign asset restructurings and DOJ inquiries." },
  { year: "2016", title: "Tech & IP Litigation Division", desc: "Integrated dedicated patent and trade-secret litigation practice for Silicon Valley leaders." },
  { year: "2024", title: "$4.8B Milestone", desc: "Surpassed $4.8 billion in total recorded client settlements and jury verdicts across 35 years." },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 py-12 sm:py-16">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A45C] mb-4">
            <Scale className="h-4 w-4" />
            <span>The Firm & Our Heritage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
            Built on Judgment. <br />
            <span className="text-gold-gradient italic font-normal">
              Defined by Trust.
            </span>
          </h1>
          <p className="text-lg text-[#B8B0A3] leading-relaxed font-light">
            LAWCREST Professional Corporation was founded on a singular premise: complex, consequential legal crises require extraordinary intellect, surgical preparation, and fearless advocacy.
          </p>
        </div>
      </section>

      {/* 2. Hero Image Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-[#262018] shadow-2xl">
          <Image
            src="/images/boardroom-conference.jpg"
            alt="LAWCREST Executive Conference Room"
            fill
            sizes="100vw"
            className="object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="bg-[#0A0A0A]/85 backdrop-blur-md p-4 rounded-lg border border-[#2E2519]">
              <span className="font-serif text-lg font-bold text-[#F5F1E8]">LAWCREST Headquarters</span>
              <p className="text-xs text-[#8F897F]">350 Fifth Avenue, 58th Floor, New York, NY</p>
            </div>
            <div className="flex items-center gap-4 bg-[#0A0A0A]/85 backdrop-blur-md px-4 py-3 rounded-lg border border-[#2E2519] text-xs text-[#D8B76A]">
              <Award className="h-4 w-4" />
              <span>Ranked Top 20 National Trial Practice</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Strategic Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Approach"
          title="The Pillars of LAWCREST"
          subtitle="How we consistently deliver market-defining victories in courts across the nation."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {firmPillars.map((pillar, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-[#262018] bg-[#14110E] hover:border-[#C9A45C]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-[#C9A45C] border border-[#C9A45C]/30 px-2 py-1 rounded bg-[#C9A45C]/10">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm text-[#8F897F] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Firm Heritage Timeline */}
      <section className="border-y border-[#262018] bg-[#0E0C09] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Firm Milestones"
            title="A History of Precedent-Setting Representation"
            subtitle="Key chapters in over three decades of legal leadership."
          />

          <div className="space-y-6 max-w-4xl mx-auto mt-12">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-6 rounded-xl border border-[#221C16] bg-[#14110E]"
              >
                <div className="sm:w-28 shrink-0">
                  <span className="font-serif text-2xl lg:text-3xl font-bold text-[#C9A45C]">
                    {m.year}
                  </span>
                </div>
                <div className="flex-1 border-l sm:border-l border-[#2E2519] pl-0 sm:pl-6">
                  <h4 className="font-serif text-lg font-bold text-[#F5F1E8] mb-1">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8F897F] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection
          title="Discuss Your Matter With Our Senior Partners"
          subtitle="Schedule a privileged evaluation of your company's dispute, regulatory risk, or trial preparation."
        />
      </section>
    </div>
  );
}
