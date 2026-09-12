"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Mail,
  Phone,
  Building,
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { useLawyer } from "@/lib/hooks/use-lawyers";

export default function AdminLawyerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useLawyer(id);

  const lawyer = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (isError || !lawyer) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <ErrorState
          title="Attorney Record Not Found"
          message="Could not retrieve attorney profile from firm roster."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={lawyer.name}
        description={`${lawyer.title || "Partner"} • ${lawyer.experienceYears || 20}+ Years Experience`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Attorneys", href: "/admin/lawyers" },
          { label: lawyer.name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
          <div className="relative h-64 w-full rounded-lg overflow-hidden bg-[#1E1914] border border-[#262018]">
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
                  sizes="33vw"
                  className="object-cover object-top filter contrast-105"
                />
              );
            })()}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A45C] block">
              {lawyer.title || "Partner"}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
              {lawyer.name}
            </h3>
          </div>

          <div className="space-y-2 text-xs text-[#8F897F] border-t border-[#221C16] pt-3">
            <div className="flex items-center gap-2 text-[#C9A45C] truncate">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span>{lawyer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0 text-[#8F897F]" />
              <span>{lawyer.phone}</span>
            </div>
          </div>
        </div>

        {/* Overview & Specialization */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
            <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
              Practice Areas & Specialization
            </h3>
            <div className="flex flex-wrap gap-2">
              {lawyer.specializations?.map((s, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="border-[#C9A45C]/40 text-[#D8B76A] text-xs py-1"
                >
                  {s}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-[#8F897F] leading-relaxed pt-2">
              {lawyer.bio ||
                "Senior trial counsel leading commercial litigation proceedings, corporate internal investigations, and state and federal appeals."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8F897F] block">
                Active Assigned Matters
              </span>
              <span className="font-serif text-2xl font-bold text-[#F5F1E8] mt-1 block">
                {lawyer.activeCasesCount || 7} Cases
              </span>
            </div>
            <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8F897F] block">
                Historical Trial Win Rate
              </span>
              <span className="font-serif text-2xl font-bold text-emerald-400 mt-1 block">
                98.2%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
