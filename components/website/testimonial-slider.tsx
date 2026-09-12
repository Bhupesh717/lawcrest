"use client";

import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#2E2519] bg-[#14110E] p-8 md:p-12 shadow-2xl">
      {/* Decorative Gold Quote Mark */}
      <Quote className="absolute top-6 right-8 h-24 w-24 text-[#C9A45C]/10 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-6 text-[#C9A45C]">
          {Array.from({ length: current.rating || 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>

        {/* Quote text */}
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F5F1E8] font-light leading-relaxed italic mb-8">
          "{current.quote}"
        </blockquote>

        {/* Client Author Info & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#262018]">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#F5F1E8]">
              {current.clientName}
            </h4>
            <p className="text-xs text-[#8F897F] mt-0.5">
              {current.clientDesignation}
              {current.clientCompany && ` — ${current.clientCompany}`}
            </p>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="h-10 w-10 p-0 rounded-full border-[#2E2519] bg-[#1A1612] text-[#E6E0D5] hover:border-[#C9A45C] hover:text-[#C9A45C]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-[#8F897F] px-2 font-mono">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="h-10 w-10 p-0 rounded-full border-[#2E2519] bg-[#1A1612] text-[#E6E0D5] hover:border-[#C9A45C] hover:text-[#C9A45C]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
