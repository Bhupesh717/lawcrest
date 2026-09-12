import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Scale, Briefcase, ShieldAlert, Cpu, Landmark, Users } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  corporate: Briefcase,
  litigation: Scale,
  ip: Cpu,
  white_collar: ShieldAlert,
  finance: Landmark,
  employment: Users,
};

export function PracticeAreaCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = iconMap[service.slug?.replace(/-/g, "_")] || Scale;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-[#262018] bg-[#14110E] p-7 transition-all duration-300 hover:border-[#C9A45C]/50 hover:bg-[#181410] hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-[#C9A45C] transition-colors group-hover:border-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#0A0A0A]">
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold text-[#8F897F] uppercase tracking-wider">
            {service.caseCount || 50}+ Cases
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-[#F5F1E8] group-hover:text-[#D8B76A] transition-colors mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-[#8F897F] leading-relaxed mb-6 line-clamp-3">
          {service.description}
        </p>

        {service.features && service.features.length > 0 && (
          <ul className="space-y-1.5 border-t border-[#221C16] pt-4 mb-6">
            {service.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-[#B8B0A3]">
                <span className="h-1 w-1 rounded-full bg-[#C9A45C]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-2">
        <Link
          href={`/practice-areas#${service.slug || service.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9A45C] group-hover:text-[#D8B76A] transition-colors"
        >
          <span>Explore Practice</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
