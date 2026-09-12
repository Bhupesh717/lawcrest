import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminBreadcrumbItem {
  label: string;
  href?: string;
}

export function AdminBreadcrumb({
  items,
  className,
}: {
  items: AdminBreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs text-[#8F897F]", className)}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/admin/dashboard"
            className="hover:text-[#C9A45C] transition-colors flex items-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-[#5A544B]" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#C9A45C] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast ? "text-[#E6E0D5] font-medium" : "")}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
