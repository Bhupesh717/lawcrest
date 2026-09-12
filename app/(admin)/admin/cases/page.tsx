"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Eye, Trash2, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { Select } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useCases, useDeleteCase } from "@/lib/hooks/use-cases";
import type { Case } from "@/types";
import { toast } from "sonner";

export default function CasesListPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  // Deletion modal state
  const [caseToDelete, setCaseToDelete] = React.useState<Case | null>(null);
  const deleteMutation = useDeleteCase();

  const { data, isLoading, refetch } = useCases({
    search: search || undefined,
    status: statusFilter || undefined,
    priority: priorityFilter || undefined,
    page,
    limit: 10,
    sortBy,
    sortOrder,
  });

  const cases = data?.data || [];
  const pagination = data?.pagination;

  const handleDelete = async () => {
    if (!caseToDelete) return;
    try {
      await deleteMutation.mutateAsync(caseToDelete.id);
      toast.success("Case Removed", {
        description: `Matter ${caseToDelete.caseNumber} has been archived.`,
      });
      setCaseToDelete(null);
      refetch();
    } catch {
      toast.error("Deletion failed");
    }
  };

  const columns: Column<Case>[] = [
    {
      key: "caseNumber",
      header: "Case Docket",
      sortable: true,
      className: "w-32",
      render: (c) => (
        <span className="font-mono text-xs font-semibold text-[#C9A45C]">
          {c.caseNumber}
        </span>
      ),
    },
    {
      key: "title",
      header: "Matter Name & Parties",
      sortable: true,
      className: "min-w-[200px]",
      render: (c) => (
        <div>
          <Link
            href={`/admin/cases/${c.id}`}
            className="font-serif text-sm font-semibold text-[#F5F1E8] hover:text-[#C9A45C] transition-colors line-clamp-1"
          >
            {c.title}
          </Link>
          <span className="text-[11px] text-[#8F897F] block">
            Client: {c.clientName || "Confidential Client"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (c) => <StatusBadge status={c.status} size="sm" />,
    },
    {
      key: "priority",
      header: "Urgency",
      sortable: true,
      render: (c) => <PriorityBadge priority={c.priority} size="sm" />,
    },
    {
      key: "caseType",
      header: "Practice Group",
      render: (c) => (
        <span className="text-xs text-[#B8B0A3] truncate block max-w-[140px] capitalize">
          {c.caseType?.replace(/-/g, " ") || "Commercial Litigation"}
        </span>
      ),
    },
    {
      key: "lawyerName",
      header: "Lead Counsel",
      render: (c) => (
        <span className="text-xs text-[#E6E0D5]">
          {c.lawyerName || "Unassigned"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-20 text-right",
      render: (c) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          <Link href={`/admin/cases/${c.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0 border-[#262018] text-[#8F897F] hover:text-[#C9A45C]"
              title="View Case"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCaseToDelete(c)}
            className="h-7 w-7 p-0 border-[#262018] text-[#8F897F] hover:text-red-400 hover:border-red-500/30"
            title="Archive Case"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Legal Cases Repository"
        description="Comprehensive docket of active, pending, and resolved litigation matters."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Cases" },
        ]}
        actions={
          <Link href="/admin/cases/new">
            <Button className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span>Create New Matter</span>
            </Button>
          </Link>
        }
      />

      <DataTable
        data={cases}
        columns={columns}
        keyExtractor={(c) => c.id}
        isLoading={isLoading}
        searchTerm={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder="Search by case # or title..."
        page={page}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.total || cases.length}
        pageSize={10}
        onPageChange={setPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(key, order) => {
          setSortBy(key);
          setSortOrder(order);
        }}
        onRowClick={(c) => router.push(`/admin/cases/${c.id}`)}
        filters={
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-36">
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="on-hold">On Hold</option>
                <option value="under-review">Under Review</option>
                <option value="closed">Closed</option>
              </Select>
            </div>

            <div className="w-32">
              <Select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Urgency</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>
          </div>
        }
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!caseToDelete}
        onClose={() => setCaseToDelete(null)}
        onConfirm={handleDelete}
        title="Archive Legal Matter"
        description={`Are you sure you wish to archive matter "${caseToDelete?.title}" (${caseToDelete?.caseNumber})? This action will change its active status and update linked records.`}
        confirmText="Archive Matter"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
