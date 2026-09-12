"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Scale,
  LayoutDashboard,
  Briefcase,
  Users,
  UserCheck,
  FileText,
  Calendar,
  CheckSquare,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Legal Cases", href: "/admin/cases", icon: Briefcase, badge: "24" },
      { label: "Clients", href: "/admin/clients", icon: Users },
      { label: "Attorneys", href: "/admin/lawyers", icon: UserCheck },
    ],
  },
  {
    label: "Case Operations",
    items: [
      { label: "Court Hearings", href: "/admin/hearings", icon: Calendar, badge: "5" },
      { label: "Tasks & Docket", href: "/admin/tasks", icon: CheckSquare },
      { label: "Legal Documents", href: "/admin/documents", icon: FileText },
    ],
  },
  {
    label: "Practice Management",
    items: [
      { label: "Billing & Invoices", href: "/admin/billing", icon: Receipt },
      { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
      { label: "Firm Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("Logged Out", { description: "You have been securely signed out." });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-[#262018] bg-[#0E0C0A] text-[#8F897F] shrink-0 h-full overflow-y-auto select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#262018]">
        <Link href="/admin/dashboard" className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="LAWCREST Logo" 
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5A544B] mb-2">
              {group.label}
            </h4>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard" || pathname === "/admin"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                    isActive
                      ? "bg-[#C9A45C]/15 text-[#D8B76A] font-semibold border border-[#C9A45C]/30 shadow-sm"
                      : "text-[#8F897F] hover:bg-[#161310] hover:text-[#F5F1E8]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive
                          ? "text-[#C9A45C]"
                          : "text-[#8F897F] group-hover:text-[#D8B76A]"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold",
                        isActive
                          ? "bg-[#C9A45C] text-[#0A0A0A]"
                          : "bg-[#1E1914] text-[#C9A45C] border border-[#2E2519]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Public Site Link & User Footprint */}
      <div className="p-3 border-t border-[#262018] space-y-2 bg-[#0A0908]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#8F897F] hover:text-[#C9A45C] hover:bg-[#14110E] transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-[#C9A45C]" />
            <span>Public Website</span>
          </span>
          <ChevronRight className="h-3 w-3 opacity-60" />
        </Link>

        {/* User Card */}
        <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#221C16] bg-[#120F0D]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A45C]/20 border border-[#C9A45C]/40 text-[#C9A45C] font-serif font-bold text-xs">
              AD
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-[#F5F1E8] truncate block">
                Alexander Drake
              </span>
              <span className="text-[10px] text-[#C9A45C] uppercase tracking-wider block truncate">
                Managing Partner
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 rounded-md text-[#8F897F] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
