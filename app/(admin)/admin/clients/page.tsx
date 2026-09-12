"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Eye, Mail, Phone, Building } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select } from "@/components/ui/select";
import { useClients } from "@/lib/hooks/use-clients";
import type { Client } from "@/types";

export default function ClientsListPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useClients({
    search: search || undefined,
    status: statusFilter || undefined,
    page,
    limit: 10,
  });

  const clients = data?.data || [];
  const pagination = data?.pagination;

  const columns: Column<Client>[] = [
    {
      key: "name",
      header: "Client Entity / Name",
      sortable: true,
      className: "min-w-[200px]",
      render: (client) => (
        <div>
          <Link
            href={`/admin/clients/${client.id}`}
            className="font-serif text-sm font-semibold text-[#F5F1E8] hover:text-[#C9A45C] transition-colors line-clamp-1"
          >
            {client.name}
          </Link>
          {client.company && (
            <span className="text-[11px] text-[#8F897F] flex items-center gap-1 mt-0.5">
              <Building className="h-3 w-3 text-[#C9A45C]" />
              {client.company}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (client) => <StatusBadge status={client.status} size="sm" />,
    },
    {
      key: "contact",
      header: "Direct Communication",
      render: (client) => (
        <div className="space-y-0.5 text-xs text-[#8F897F]">
          {client.email && (
            <div className="flex items-center gap-1 text-[#C9A45C] truncate max-w-[180px]">
              <Mail className="h-3 w-3 shrink-0" />
              <span>{client.email}</span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-1 text-[#8F897F]">
              <Phone className="h-3 w-3 shrink-0" />
              <span>{client.phone}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "activeCases",
      header: "Active Matters",
      className: "text-center w-28",
      render: (client) => (
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#17130F] border border-[#262018] text-[#D8B76A]">
          {client.activeCasesCount || 1} Matters
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-16 text-right",
      render: (client) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Link href={`/admin/clients/${client.id}`}>
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
        title="Client Entities & Retainers"
        description="Directory of institutional corporate clients, private trusts, and active retainers."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Clients" },
        ]}
        actions={
          <Link href="/admin/clients/new">
            <Button className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span>Register Client</span>
            </Button>
          </Link>
        }
      />

      <DataTable
        data={clients}
        columns={columns}
        keyExtractor={(client) => client.id}
        isLoading={isLoading}
        searchTerm={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder="Search clients by name or company..."
        page={page}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.total || clients.length}
        pageSize={10}
        onPageChange={setPage}
        onRowClick={(client) => router.push(`/admin/clients/${client.id}`)}
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
              <option value="ACTIVE">Active Retainer</option>
              <option value="PROSPECTIVE">Prospective</option>
              <option value="INACTIVE">Inactive</option>
            </Select>
          </div>
        }
      />
    </div>
  );
}
