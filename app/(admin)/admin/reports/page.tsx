"use client";

import * as React from "react";
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  Trophy,
  Scale,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { RevenueChart } from "@/components/admin/charts/revenue-chart";
import { CaseOverviewChart } from "@/components/admin/charts/case-overview-chart";
import { MonthlyTrendsChart } from "@/components/admin/charts/monthly-trends-chart";
import { LawyerPerformanceChart } from "@/components/admin/charts/lawyer-performance-chart";
import { toast } from "sonner";

export default function ReportsPage() {
  const [period, setPeriod] = React.useState("ytd");

  const handleExport = (format: string) => {
    toast.success(`Exporting ${format.toUpperCase()} Report`, {
      description: "Compiling financial audit and litigation performance records...",
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Litigation Analytics & Practice Reports"
        description="Comprehensive audit of partner billable realizations, docket closure velocity, and financial retainers."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Reports" },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <div className="w-36">
              <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="q1">Q1 2026</option>
                <option value="ytd">Year to Date</option>
                <option value="2025">Fiscal Year 2025</option>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("csv")}
              className="border-[#262018] text-[#8F897F] hover:text-[#C9A45C] gap-1.5 h-9"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>
          </div>
        }
      />

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Billable Hours (YTD)"
          value="4,820"
          change={14.2}
          trend="up"
          changeLabel="Avg: 168 hrs/partner"
          icon={BarChart3}
        />
        <StatCard
          title="Average Realization Rate"
          value="94.6%"
          change={2.1}
          trend="up"
          changeLabel="Industry standard: 88%"
          icon={TrendingUp}
        />
        <StatCard
          title="Trial Verdict Rate"
          value="98.4%"
          description="Across 18 jury & bench trials"
          icon={Trophy}
        />
        <StatCard
          title="Total Collected Revenue"
          prefix="$"
          value="3,840,000"
          change={18.5}
          trend="up"
          changeLabel="Ahead of 2026 budget"
          icon={DollarSign}
        />
      </div>

      {/* 4 Analytics Charts in 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <CaseOverviewChart />
        <MonthlyTrendsChart />
        <LawyerPerformanceChart />
      </div>
    </div>
  );
}
