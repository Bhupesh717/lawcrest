import * as React from "react";
import { ShieldCheck, Trophy, Scale, Landmark } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    value: "$4.8B+",
    label: "Recovered for Clients",
    description: "In verdicts, multi-district settlements, and commercial transactions.",
  },
  {
    icon: Scale,
    value: "98.4%",
    label: "Trial & Settlement Success",
    description: "Proven record across state, federal, and international courts.",
  },
  {
    icon: ShieldCheck,
    value: "35+",
    label: "Years of Trial Supremacy",
    description: "Continuously representing industry leaders and innovators since 1988.",
  },
  {
    icon: Landmark,
    value: "1,200+",
    label: "High-Stakes Matters",
    description: "Successfully navigated complex disputes and corporate restructurings.",
  },
];

export function StatCounter() {
  return (
    <div className="rounded-2xl border border-[#262018] bg-[#120F0D] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#221C16]">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`flex flex-col items-center text-center ${
                i > 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C9A45C]/30 bg-[#C9A45C]/10 text-[#C9A45C] mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight">
                {stat.value}
              </span>
              <h4 className="font-serif text-sm font-semibold text-[#D8B76A] mt-2 mb-1">
                {stat.label}
              </h4>
              <p className="text-xs text-[#8F897F] leading-relaxed max-w-xs">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
