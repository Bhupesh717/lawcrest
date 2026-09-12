import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT" | string;

export interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
  size?: "sm" | "default";
}

const priorityConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "gold" | "success" | "warning" | "info" }
> = {
  LOW: { label: "Low", variant: "secondary" },
  MEDIUM: { label: "Medium", variant: "info" },
  HIGH: { label: "High", variant: "warning" },
  URGENT: { label: "Urgent", variant: "destructive" },
};

export function PriorityBadge({ priority, className, size = "default" }: PriorityBadgeProps) {
  const key = priority.toUpperCase();
  const config = priorityConfig[key] || {
    label: priority,
    variant: "secondary" as const,
  };

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "font-semibold text-[10px] tracking-wider uppercase",
        size === "sm" && "px-1.5 py-0 text-[9px]",
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
