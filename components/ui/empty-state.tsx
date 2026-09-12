import * as React from "react";
import { FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderSearch,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-[#2E2519] bg-[#120F0D]/60 my-4",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A45C]/20 bg-[#C9A45C]/10 text-[#C9A45C] mb-4">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-serif font-semibold text-[#F5F1E8]">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-sm text-[#8F897F] max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
