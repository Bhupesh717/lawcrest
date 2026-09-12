"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Scale,
  Plus,
  User,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select } from "@/components/ui/select";
import { useHearings } from "@/lib/hooks/use-hearings";
import type { Hearing } from "@/types";
import { toast } from "sonner";

export default function HearingsPage() {
  const [statusFilter, setStatusFilter] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useHearings({
    status: statusFilter || undefined,
    page,
    limit: 10,
  });

  const hearings = data?.data || [];
  const pagination = data?.pagination;

  const handleScheduleMock = () => {
    toast.info("Docket Schedule", {
      description: "Hearing docket booking synchronized with federal Pacer calendar.",
    });
  };

  const columns: Column<Hearing>[] = [
    {
      key: "date",
      header: "Date & Time",
      sortable: true,
      className: "w-44",
      render: (h) => (
        <div>
          <span className="font-mono text-xs font-semibold text-[#F5F1E8] block">
            {h.date ? new Date(h.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Scheduled"}
          </span>
          <span className="text-[11px] text-[#C9A45C] flex items-center gap-1 mt-0.5">
            <Clock className="h-3 w-3" />
            {h.time || "9:30 AM EST"}
          </span>
        </div>
      ),
    },
    {
      key: "title",
      header: "Proceeding / Hearing Subject",
      className: "min-w-[220px]",
      render: (h) => (
        <div>
          <span className="font-serif text-sm font-semibold text-[#F5F1E8] block line-clamp-1">
            {h.title}
          </span>
          <span className="text-[11px] text-[#8F897F] block line-clamp-1">
            Matter: {h.case?.title || "Apex BioTech Litigation"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (h) => <StatusBadge status={h.status} size="sm" />,
    },
    {
      key: "venue",
      header: "Courtroom & Presiding Judge",
      render: (h) => (
        <div className="text-xs text-[#B8B0A3] space-y-0.5">
          <div className="flex items-center gap-1.5 text-[#E6E0D5]">
            <Scale className="h-3 w-3 text-[#C9A45C] shrink-0" />
            <span>{h.courtroom || h.courtName || "U.S. District Court"}</span>
          </div>
          <span className="text-[11px] text-[#8F897F] block">
            Judge: {h.judge || "Hon. Victoria K. Vance"}
          </span>
        </div>
      ),
    },
    {
      key: "lawyer",
      header: "Lead Counsel Appearing",
      render: (h) => (
        <span className="text-xs text-[#E6E0D5]">
          {h.lawyer?.name || "Alexander Drake"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Court Hearings & Trial Docket"
        description="Master calendar of oral arguments, motion hearings, pretrial conferences, and trial calendar dates."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Hearings" },
        ]}
        actions={
          <Button
            onClick={handleScheduleMock}
            className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Schedule Hearing</span>
          </Button>
        }
      />

      <DataTable
        data={hearings}
        columns={columns}
        keyExtractor={(h) => h.id}
        isLoading={isLoading}
        page={page}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.total || hearings.length}
        pageSize={10}
        onPageChange={setPage}
        filters={
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="POSTPONED">Postponed</option>
            </Select>
          </div>
        }
      />
    </div>
  );
}
