import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#2A231C] bg-[#14110F] px-3.5 py-2 text-sm text-[#F5F1E8] placeholder:text-[#6E675D] transition-colors focus-visible:outline-none focus-visible:border-[#C9A45C] focus-visible:ring-1 focus-visible:ring-[#C9A45C]/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
