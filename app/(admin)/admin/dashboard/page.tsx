"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  CheckSquare,
  DollarSign,
  Plus,
  ArrowUpRight,
  Clock,
  ChevronRight,
  ShieldAlert,
  Scale,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { CaseOverviewChart } from "@/components/admin/charts/case-overview-chart";
import { RevenueChart } from "@/components/admin/charts/revenue-chart";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { useDashboardStats } from "@/lib/hooks/use-dashboard";
import { useCases } from "@/lib/hooks/use-cases";
import { useHearings } from "@/lib/hooks/use-hearings";

export default function AdminDashboardPage() {
  const { data: dashboardData, isLoading: statsLoading } = useDashboardStats();
  const { data: casesData, isLoading: casesLoading } = useCases({ limit: 5 });
  const { data: hearingsData, isLoading: hearingsLoading } = useHearings({ limit: 4 });

  const stats = dashboardData?.data?.stats;
  const recentCases = casesData?.data || [];
  const upcomingHearings = hearingsData?.data || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Executive Practice Dashboard"
        description="Real-time trial docket status, financial metrics, and operational litigation analytics."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/cases/new">
              <Button className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                <span>New Case Matter</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Matters"
          value={stats?.activeCases ?? 24}
          change={8.5}
          trend="up"
          changeLabel="vs last month"
          icon={Briefcase}
        />
        <StatCard
          title="Monthly Billed"
          prefix="$"
          value={(stats?.monthlyRevenue ?? 640000).toLocaleString()}
          change={12.4}
          trend="up"
          changeLabel="vs last month"
          icon={DollarSign}
        />
        <StatCard
          title="Upcoming Hearings"
          value={stats?.upcomingHearings ?? 8}
          description="Next docket: Tomorrow, 9:30 AM"
          icon={Calendar}
        />
        <StatCard
          title="Docket Tasks"
          value={stats?.pendingTasks ?? 19}
          change={-4}
          trend="down"
          changeLabel="7 due this week"
          icon={CheckSquare}
        />
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <CaseOverviewChart />
      </div>

      {/* Bottom 2-Column: Recent Cases & Upcoming Hearings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Cases (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[#262018] bg-[#14110E] p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#221C16]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
                Active Case Matters
              </h3>
              <p className="text-xs text-[#8F897F]">Most recently updated trial proceedings</p>
            </div>
            <Link
              href="/admin/cases"
              className="text-xs font-semibold text-[#C9A45C] hover:text-[#D8B76A] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {casesLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-[#221C16]">
              {recentCases.map((c) => (
                <div
                  key={c.id}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#1A1612] px-2 rounded-lg transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-[#8F897F]">
                        {c.caseNumber}
                      </span>
                      <PriorityBadge priority={c.priority} size="sm" />
                    </div>
                    <Link
                      href={`/admin/cases/${c.id}`}
                      className="font-serif text-sm font-semibold text-[#F5F1E8] hover:text-[#C9A45C] transition-colors truncate block"
                    >
                      {c.title}
                    </Link>
                    <span className="text-xs text-[#8F897F]">
                      Client: {c.clientName || "Corporate Client"}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <StatusBadge status={c.status} size="sm" />
                    <Link href={`/admin/cases/${c.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0 border-[#262018] text-[#8F897F] hover:text-[#C9A45C]"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Hearings Docket (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#262018] bg-[#14110E] p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#221C16]">
            <div>
              <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
                Court Docket & Hearings
              </h3>
              <p className="text-xs text-[#8F897F]">Upcoming oral arguments & motions</p>
            </div>
            <Link
              href="/admin/hearings"
              className="text-xs font-semibold text-[#C9A45C] hover:text-[#D8B76A] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Calendar</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {hearingsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingHearings.map((h) => (
                <div
                  key={h.id}
                  className="p-3.5 rounded-lg border border-[#221C16] bg-[#17130F] flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#F5F1E8]">
                        {h.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8F897F]">
                      Court: {h.courtRoom || h.courtName || "U.S. District Court"}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#C9A45C] font-mono">
                      <Clock className="h-3 w-3" />
                      <span>{h.date ? new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Upcoming"}</span>
                    </div>
                  </div>

                  <StatusBadge status={h.status} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
