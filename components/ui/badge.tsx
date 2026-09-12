import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-[#C9A45C]/30 bg-[#C9A45C]/15 text-[#D8B76A] hover:bg-[#C9A45C]/25",
        secondary:
          "border border-white/10 bg-white/5 text-[#E6E0D5] hover:bg-white/10",
        destructive:
          "border border-red-500/30 bg-red-500/15 text-red-400 hover:bg-red-500/25",
        outline:
          "border border-[#C9A45C]/40 text-[#C9A45C]",
        gold:
          "border border-[#C9A45C] bg-[#C9A45C] text-[#0A0A0A] font-bold",
        success:
          "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
        warning:
          "border border-amber-500/30 bg-amber-500/15 text-amber-400",
        info:
          "border border-sky-500/30 bg-sky-500/15 text-sky-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
