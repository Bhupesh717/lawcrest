import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  eyebrowColor?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  eyebrowColor = "text-[#C9A45C]",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isRight = align === "right";

  return (
    <div
      className={cn(
        "mb-10",
        isCenter && "text-center mx-auto max-w-3xl",
        isRight && "text-right ml-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.2em] font-semibold",
            eyebrowColor,
            isCenter && "justify-center",
            isRight && "justify-end"
          )}
        >
          <span className="h-px w-6 bg-[#C9A45C]/60" />
          <span>{eyebrow}</span>
          {isCenter && <span className="h-px w-6 bg-[#C9A45C]/60" />}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#F5F1E8] tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[#8F897F] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
