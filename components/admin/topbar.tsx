"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Plus,
  Briefcase,
  Menu,
  Shield,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminTopbar({
  onToggleMobileSidebar,
}: {
  onToggleMobileSidebar?: () => void;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes("/admin/cases/new")) return "Create New Case";
    if (pathname.includes("/admin/cases/")) return "Case Details & Records";
    if (pathname.includes("/admin/cases")) return "Legal Cases Repository";
    if (pathname.includes("/admin/clients/new")) return "Register Client";
    if (pathname.includes("/admin/clients/")) return "Client Profile";
    if (pathname.includes("/admin/clients")) return "Client Directory";
    if (pathname.includes("/admin/lawyers/new")) return "Add Attorney";
    if (pathname.includes("/admin/lawyers/")) return "Attorney Profile";
    if (pathname.includes("/admin/lawyers")) return "Attorneys & Staff";
    if (pathname.includes("/admin/hearings")) return "Court Hearings & Docket";
    if (pathname.includes("/admin/tasks")) return "Tasks & Litigation Kanban";
    if (pathname.includes("/admin/documents")) return "Legal Document Vault";
    if (pathname.includes("/admin/billing")) return "Billing & Invoices";
    if (pathname.includes("/admin/reports")) return "Analytics & Firm Reports";
    if (pathname.includes("/admin/settings")) return "Firm Configuration";
    return "Legal Dashboard Overview";
  };

  const handleNotificationClick = () => {
    toast.info("Firm Notifications", {
      description: "Hearing in State v. Apex scheduled tomorrow at 9:30 AM EST in SDNY Room 412.",
    });
  };

  return (
    <header className="h-16 border-b border-[#262018] bg-[#0D0B09] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Mobile menu toggle & page title */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-md border border-[#262018] bg-[#14110E] text-[#8F897F] hover:text-[#F5F1E8]"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div>
          <h2 className="font-serif text-base sm:text-lg font-bold text-[#F5F1E8] tracking-tight truncate">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right Controls: Quick Add Button & Notification bell */}
      <div className="flex items-center gap-3">
        {/* Quick Add Case */}
        <Link href="/admin/cases/new">
          <Button
            size="sm"
            className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-8 px-3 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Case</span>
          </Button>
        </Link>

        {/* Notifications */}
        <button
          type="button"
          onClick={handleNotificationClick}
          className="relative p-2 rounded-lg border border-[#262018] bg-[#14110E] text-[#8F897F] hover:text-[#C9A45C] hover:border-[#C9A45C]/40 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#C9A45C]" />
        </button>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Synced</span>
        </div>
      </div>
    </header>
  );
}
