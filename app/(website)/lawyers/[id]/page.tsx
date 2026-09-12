"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Mail,
  Phone,
  ArrowLeft,
  Award,
  GraduationCap,
  Scale,
  ShieldCheck,
  Building,
  CheckCircle2,
} from "lucide-react";
import { useLawyer } from "@/lib/hooks/use-lawyers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { CtaSection } from "@/components/website/cta-section";

export default function LawyerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useLawyer(id);

  const lawyer = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-96 rounded-xl" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !lawyer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorState
          title="Attorney Profile Not Found"
          message="The attorney profile you requested could not be located in our firm directory."
          onRetry={refetch}
        />
        <div className="text-center mt-6">
          <Link href="/lawyers">
            <Button variant="outline" className="border-[#2E2519] text-[#C9A45C]">
              Return to Attorneys Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {/* Breadcrumb Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/lawyers"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F897F] hover:text-[#C9A45C] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Attorneys</span>
        </Link>
      </div>

      {/* Main Profile Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Portrait & Direct Contact */}
          <div className="space-y-6">
            <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-[#2E2519] bg-[#17130F] shadow-2xl">
              {(() => {
                const lawyerImages = [
                  "/images/lawyer-alexander-drake.jpg",
                  "/images/lawyer-victoria-sterling.jpg",
                  "/images/lawyer-marcus-vance.jpg",
                  "/images/lawyer-elena-rostova.jpg",
                ];
                const defaultImage = lawyerImages[Math.abs(lawyer.name.length) % lawyerImages.length];
                const imgSrc = lawyer.avatarUrl || (lawyer.image?.startsWith("/images/") ? lawyer.image : defaultImage) || defaultImage;

                return (
                  <Image
                    src={imgSrc}
                    alt={lawyer.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top filter contrast-105"
                    priority
                  />
                );
              })()}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-80" />
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#F5F1E8]">
                Direct Contact
              </h4>
              <div className="space-y-3 text-xs">
                {lawyer.email && (
                  <div className="flex items-center gap-3 text-[#B8B0A3]">
                    <Mail className="h-4 w-4 text-[#C9A45C] shrink-0" />
                    <a
                      href={`mailto:${lawyer.email}`}
                      className="hover:text-[#C9A45C] transition-colors truncate"
                    >
                      {lawyer.email}
                    </a>
                  </div>
                )}
                {lawyer.phone && (
                  <div className="flex items-center gap-3 text-[#B8B0A3]">
                    <Phone className="h-4 w-4 text-[#C9A45C] shrink-0" />
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="hover:text-[#C9A45C] transition-colors"
                    >
                      {lawyer.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-[#B8B0A3]">
                  <Building className="h-4 w-4 text-[#C9A45C] shrink-0" />
                  <span>New York Global Headquarters</span>
                </div>
              </div>

              <Link href={`/contact?attorney=${encodeURIComponent(lawyer.name)}`} className="block pt-2">
                <Button className="w-full bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-10">
                  Consult With {lawyer.name.split(" ")[0]}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Bio, Credentials & Experience */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-serif text-sm font-semibold text-[#C9A45C] uppercase tracking-wider">
                  {lawyer.title || "Senior Partner"}
                </span>
                {lawyer.experienceYears && (
                  <span className="text-xs text-[#8F897F]">
                    • {lawyer.experienceYears} Years in High-Stakes Practice
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight mb-4">
                {lawyer.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {lawyer.specializations?.map((spec, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-[#C9A45C]/40 text-[#D8B76A] text-xs"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="border-t border-[#221C16] pt-6">
                <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mb-4">
                  Biography & Practice Overview
                </h3>
                <p className="text-sm sm:text-base text-[#B8B0A3] leading-relaxed mb-4">
                  {lawyer.bio ||
                    "Nationally recognized lead trial counsel specializing in bet-the-company commercial disputes, patent enforcement, and federal criminal investigations."}
                </p>
                <p className="text-sm text-[#8F897F] leading-relaxed">
                  Regularly counsels corporate boards, audit committees, and executive officers on governance crises, compliance overhauls, and appellate proceedings before the U.S. Courts of Appeals and State Supreme Courts.
                </p>
              </div>
            </div>

            {/* Education & Admissions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#221C16] pt-8">
              <div className="p-5 rounded-xl border border-[#262018] bg-[#14110E]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A45C] mb-3">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
                <ul className="space-y-2 text-xs text-[#E6E0D5]">
                  <li>• J.D., Columbia Law School (Editor, Law Review)</li>
                  <li>• B.A., Yale University, Magna Cum Laude</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-[#262018] bg-[#14110E]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A45C] mb-3">
                  <Award className="h-4 w-4" />
                  <span>Bar & Court Admissions</span>
                </div>
                <ul className="space-y-2 text-xs text-[#E6E0D5]">
                  <li>• New York State Bar</li>
                  <li>• U.S. District Court, SDNY & EDNY</li>
                  <li>• U.S. Court of Appeals for the Second Circuit</li>
                </ul>
              </div>
            </div>

            {/* Representative Matters */}
            <div className="border-t border-[#221C16] pt-8">
              <h3 className="font-serif text-xl font-bold text-[#F5F1E8] mb-4">
                Notable Representation Highlights
              </h3>
              <div className="space-y-3">
                {[
                  "Secured complete defense verdict in $1.4B antitrust conspiracy action representing multinational semiconductor manufacturer.",
                  "Successfully negotiated non-prosecution agreement with SEC and DOJ in complex foreign bribery investigation.",
                  "Obtained preliminary injunction preserving key pharmaceutical patent portfolio valued in excess of $850 million.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#B8B0A3] bg-[#17130F] p-3.5 rounded-lg border border-[#262018]">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CtaSection />
      </section>
    </div>
  );
}
