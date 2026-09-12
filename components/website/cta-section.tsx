import * as React from "react";
import Link from "next/link";
import { ArrowRight, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection({
  title = "Protect What Took A Lifetime To Build.",
  subtitle = "When your company, assets, or freedom are at stake, every hour matters. Contact our senior trial counsel today for a confidential legal review.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#C9A45C]/30 bg-gradient-to-br from-[#1A1510] via-[#120F0D] to-[#0D0A08] p-8 sm:p-12 lg:p-16 my-16 shadow-2xl">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-[#C9A45C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-[#C9A45C]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A45C]/30 bg-[#17130F] text-[#C9A45C] text-xs font-semibold uppercase tracking-widest mb-6">
          <Lock className="h-3.5 w-3.5" />
          <span>Privileged & Confidential Consultation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight leading-tight mb-6">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[#B8B0A3] leading-relaxed mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-sm tracking-wider uppercase h-13 px-8 shadow-[0_0_25px_rgba(201,164,92,0.3)]">
              <span>Schedule Case Consultation</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href="tel:+12125550190" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[#2E2519] bg-[#14110E] hover:border-[#C9A45C]/50 hover:bg-[#1A1612] text-[#E6E0D5] text-sm tracking-wider uppercase h-13 px-7"
            >
              <Phone className="mr-2 h-4 w-4 text-[#C9A45C]" />
              <span>Call +1 (212) 555-0190</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
