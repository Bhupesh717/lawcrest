"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Receipt,
  DollarSign,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/ui/stat-card";
import { Select } from "@/components/ui/select";
import { useInvoices } from "@/lib/hooks/use-invoices";
import type { Invoice } from "@/types";
import { toast } from "sonner";

export default function BillingPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useInvoices({
    status: statusFilter || undefined,
    page,
    limit: 10,
  });

  const invoices = data?.data || [];
  const pagination = data?.pagination;

  const handleCreateMock = () => {
    toast.info("Generate Fee Statement", {
      description: "Select client matter and import verified timekeeper billable records.",
    });
  };

  const columns: Column<Invoice>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice Reference",
      sortable: true,
      className: "w-36",
      render: (inv) => (
        <span className="font-mono text-xs font-semibold text-[#C9A45C]">
          {inv.invoiceNumber}
        </span>
      ),
    },
    {
      key: "client",
      header: "Billed Client & Matter",
      className: "min-w-[220px]",
      render: (inv) => (
        <div>
          <Link
            href={`/admin/billing/${inv.id}`}
            className="font-serif text-sm font-semibold text-[#F5F1E8] hover:text-[#C9A45C] transition-colors line-clamp-1"
          >
            {inv.client?.name || "Corporate Client"}
          </Link>
          <span className="text-[11px] text-[#8F897F] block line-clamp-1">
            Matter: {inv.case?.title || "Commercial Dispute Defense"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Payment Status",
      sortable: true,
      render: (inv) => <StatusBadge status={inv.status} size="sm" />,
    },
    {
      key: "amount",
      header: "Statement Total",
      sortable: true,
      render: (inv) => (
        <span className="font-serif text-sm font-bold text-[#F5F1E8]">
          ${inv.total?.toLocaleString() || "65,000"}
        </span>
      ),
    },
    {
      key: "dueDate",
      header: "Payment Due",
      render: (inv) => (
        <span className="text-xs text-[#8F897F] font-mono">
          {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "Net 30"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-16 text-right",
      render: (inv) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Link href={`/admin/billing/${inv.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0 border-[#262018] text-[#8F897F] hover:text-[#C9A45C]"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Billing & Retainer Invoices"
        description="Monitor billable partner hours, retainer trust balances, and institutional accounts receivable."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Billing" },
        ]}
        actions={
          <Button
            onClick={handleCreateMock}
            className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Generate Invoice</span>
          </Button>
        }
      />

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Billed This Month"
          prefix="$"
          value="640,000"
          change={12.4}
          trend="up"
          changeLabel="Realization: 94%"
          icon={Receipt}
        />
        <StatCard
          title="Outstanding Retainers"
          prefix="$"
          value="185,000"
          description="Due within 15 days"
          icon={Clock}
        />
        <StatCard
          title="Overdue Accounts"
          prefix="$"
          value="24,500"
          change={-15}
          trend="down"
          changeLabel="2 client accounts"
          icon={AlertTriangle}
        />
      </div>

      <DataTable
        data={invoices}
        columns={columns}
        keyExtractor={(inv) => inv.id}
        isLoading={isLoading}
        page={page}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.total || invoices.length}
        pageSize={10}
        onPageChange={setPage}
        onRowClick={(inv) => router.push(`/admin/billing/${inv.id}`)}
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
              <option value="PAID">Paid</option>
              <option value="SENT">Sent / Awaiting</option>
              <option value="DRAFT">Draft</option>
              <option value="OVERDUE">Overdue</option>
            </Select>
          </div>
        }
      />
    </div>
  );
}
