import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "default";
}

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "gold" | "success" | "warning" | "info" }
> = {
  // Case statuses
  OPEN: { label: "Open", variant: "info" },
  IN_PROGRESS: { label: "In Progress", variant: "warning" },
  PENDING: { label: "Pending", variant: "warning" },
  PENDING_HEARING: { label: "Hearing Pending", variant: "default" },
  ON_HOLD: { label: "On Hold", variant: "secondary" },
  RESOLVED: { label: "Resolved", variant: "success" },
  CLOSED: { label: "Closed", variant: "secondary" },

  // Client statuses
  ACTIVE: { label: "Active", variant: "success" },
  INACTIVE: { label: "Inactive", variant: "secondary" },
  PROSPECTIVE: { label: "Prospective", variant: "info" },

  // Invoice statuses
  PAID: { label: "Paid", variant: "success" },
  SENT: { label: "Sent", variant: "info" },
  DRAFT: { label: "Draft", variant: "secondary" },
  OVERDUE: { label: "Overdue", variant: "destructive" },
  CANCELLED: { label: "Cancelled", variant: "secondary" },

  // Hearing statuses
  SCHEDULED: { label: "Scheduled", variant: "info" },
  COMPLETED: { label: "Completed", variant: "success" },
  POSTPONED: { label: "Postponed", variant: "warning" },

  // Task statuses
  TODO: { label: "To Do", variant: "secondary" },
  UNDER_REVIEW: { label: "Under Review", variant: "warning" },
};

export function StatusBadge({ status, className, size = "default" }: StatusBadgeProps) {
  const normalizedKey = status.toUpperCase().replace(/[\s-]+/g, "_");
  const config = statusConfig[normalizedKey] || {
    label: status.replace(/_/g, " "),
    variant: "secondary" as const,
  };

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "font-medium uppercase text-[10px] tracking-wider",
        size === "sm" && "px-1.5 py-0 text-[9px]",
        className
      )}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {config.label}
    </Badge>
  );
}
