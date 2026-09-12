"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Eye, Mail, Phone, Award } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLawyers } from "@/lib/hooks/use-lawyers";
import type { Lawyer } from "@/types";

export default function LawyersListPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading } = useLawyers({
    search: search || undefined,
    page,
    limit: 10,
  });

  const lawyers = data?.data || [];
  const pagination = data?.pagination;

  const columns: Column<Lawyer>[] = [
    {
      key: "name",
      header: "Attorney Name & Title",
      sortable: true,
      className: "min-w-[200px]",
      render: (lawyer) => (
        <div>
          <Link
            href={`/admin/lawyers/${lawyer.id}`}
            className="font-serif text-sm font-semibold text-[#F5F1E8] hover:text-[#C9A45C] transition-colors"
          >
            {lawyer.name}
          </Link>
          <span className="text-[11px] text-[#C9A45C] block">
            {lawyer.title || "Partner"}
          </span>
        </div>
      ),
    },
    {
      key: "specializations",
      header: "Practice Specialization",
      render: (lawyer) => (
        <div className="flex flex-wrap gap-1">
          {lawyer.specializations?.slice(0, 2).map((s, i) => (
            <Badge key={i} variant="outline" className="text-[10px] border-[#2E2519] text-[#B8B0A3]">
              {s}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "caseload",
      header: "Active Matters",
      className: "text-center w-28",
      render: (lawyer) => (
        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#17130F] border border-[#262018] text-[#D8B76A]">
          {lawyer.activeCasesCount || 6} Cases
        </span>
      ),
    },
    {
      key: "contact",
      header: "Contact Details",
      render: (lawyer) => (
        <div className="space-y-0.5 text-xs text-[#8F897F]">
          <span className="block truncate max-w-[170px] text-[#C9A45C]">{lawyer.email}</span>
          <span className="block">{lawyer.phone}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-16 text-right",
      render: (lawyer) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Link href={`/admin/lawyers/${lawyer.id}`}>
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
        title="Attorneys & Legal Roster"
        description="Directory of partners, special counsel, and litigation associates across all jurisdictions."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Attorneys" },
        ]}
        actions={
          <Link href="/admin/lawyers/new">
            <Button className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span>Add Attorney</span>
            </Button>
          </Link>
        }
      />

      <DataTable
        data={lawyers}
        columns={columns}
        keyExtractor={(lawyer) => lawyer.id}
        isLoading={isLoading}
        searchTerm={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder="Search attorneys by name or practice area..."
        page={page}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.total || lawyers.length}
        pageSize={10}
        onPageChange={setPage}
        onRowClick={(lawyer) => router.push(`/admin/lawyers/${lawyer.id}`)}
      />
    </div>
  );
}
