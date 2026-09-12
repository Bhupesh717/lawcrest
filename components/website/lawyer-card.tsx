import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowRight, Award } from "lucide-react";
import type { Lawyer } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function LawyerCard({
  lawyer,
  className,
}: {
  lawyer: Lawyer;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-[#262018] bg-[#14110E] transition-all duration-300 hover:border-[#C9A45C]/50 hover:shadow-[0_12px_35px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Photo Container with subtle gradient vignette */}
      <div className="relative h-72 w-full overflow-hidden bg-[#1E1914]">
        {(() => {
          const lawyerImages = [
            "/images/lawyer-alexander-drake.jpg",
            "/images/lawyer-victoria-sterling.jpg",
            "/images/lawyer-marcus-vance.jpg",
            "/images/lawyer-elena-rostova.jpg",
          ];
          const defaultImage = lawyerImages[Math.abs(lawyer.name.length) % lawyerImages.length];
          const imgSrc =
            lawyer.avatarUrl ||
            (lawyer.image && !lawyer.image.includes("/lawyers/") ? lawyer.image : defaultImage) ||
            defaultImage;

          return (
            <Image
              src={imgSrc}
              alt={lawyer.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top filter contrast-105 transition-all duration-500 group-hover:scale-105"
            />
          );
        })()}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent opacity-90" />
      </div>

      {/* Profile Details */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[#C9A45C] uppercase tracking-wider">
              {lawyer.designation || lawyer.title || "Partner"}
            </span>
            {(lawyer.experience || lawyer.experienceYears) ? (
              <span className="text-[11px] text-[#8F897F]">
                • {lawyer.experience ?? lawyer.experienceYears} Years Experience
              </span>
            ) : null}
          </div>

          <h3 className="font-serif text-xl font-bold text-[#F5F1E8] group-hover:text-[#D8B76A] transition-colors">
            {lawyer.name}
          </h3>

          <p className="mt-2 text-xs text-[#8F897F] line-clamp-2">
            {lawyer.bio ||
              "Specializing in high-stakes corporate disputes, federal appellate proceedings, and strategic regulatory compliance."}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {lawyer.specializations?.slice(0, 2).map((spec, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-[10px] bg-[#1F1914] text-[#B8B0A3] border-[#2C241B]"
              >
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#221C16] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#8F897F]">
            {lawyer.email && (
              <a
                href={`mailto:${lawyer.email}`}
                className="hover:text-[#C9A45C] transition-colors"
                title="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
            {lawyer.phone && (
              <a
                href={`tel:${lawyer.phone}`}
                className="hover:text-[#C9A45C] transition-colors"
                title="Call Office"
              >
                <Phone className="h-4 w-4" />
              </a>
            )}
          </div>
          <Link
            href={`/lawyers/${lawyer.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A45C] hover:text-[#D8B76A] transition-colors uppercase tracking-wider"
          >
            <span>Biography</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
