import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[90px] w-full rounded-md border border-[#2A231C] bg-[#14110F] px-3.5 py-2.5 text-sm text-[#F5F1E8] placeholder:text-[#6E675D] transition-colors focus-visible:outline-none focus-visible:border-[#C9A45C] focus-visible:ring-1 focus-visible:ring-[#C9A45C]/50 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
