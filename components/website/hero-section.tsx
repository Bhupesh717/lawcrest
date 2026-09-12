"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Award, Shield, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-[#262018]">
      {/* Cinematic Background Image with Dark Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center filter grayscale brightness-40 transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: 'url("/images/hero-courthouse.jpg")',
        }}
      />

      {/* Multi-layered dark gradients for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(201,164,92,0.12)_0%,transparent_60%)]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-36 lg:pb-10 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="max-w-3xl lg:w-1/2">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C9A45C]/30 bg-[#17130F]/90 text-[#D8B76A] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              <Shield className="h-3.5 w-3.5" />
              <span>Excellence In High-Stakes Advocacy</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#F5F1E8] tracking-tight leading-[1.08] mb-6">
              Decisive Counsel. <br />
              <span className="text-gold-gradient font-normal italic">
                Relentless Advocacy.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#B8B0A3] leading-relaxed mb-8 max-w-2xl font-light">
              When billions in enterprise value or lifetime reputations hang in the balance, LAWCREST provides strategic clarity, courtroom mastery, and unmatched dedication.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-sm tracking-wider uppercase h-13 px-8 shadow-[0_0_25px_rgba(201,164,92,0.3)] transition-all duration-300">
                  <span>Request Case Evaluation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#2E2519] bg-[#14110E]/80 hover:border-[#C9A45C]/50 hover:bg-[#1A1612] text-[#E6E0D5] text-sm tracking-wider uppercase h-13 px-7"
                >
                  View Verdicts & Results
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/images/scale-justice-round-composition.png"
              alt="Lawcrest Scales of Justice"
              className="w-full max-w-lg object-contain drop-shadow-[0_0_35px_rgba(201,164,92,0.15)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
