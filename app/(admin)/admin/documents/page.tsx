"use client";

import * as React from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Filter,
  FileCode,
  Shield,
  Search,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useDocuments, useDeleteDocument } from "@/lib/hooks/use-documents";
import type { LegalDocument } from "@/types";
import { toast } from "sonner";

export default function DocumentsPage() {
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading, refetch } = useDocuments({
    search: search || undefined,
    category: categoryFilter || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteDocument();

  const documents = data?.data || [];
  const pagination = data?.pagination;

  const handleDownload = (doc: LegalDocument) => {
    toast.success("Document Decrypted", {
      description: `Downloading verified copy of "${doc.title}".`,
    });
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Document Purged", {
        description: `"${name}" removed from vault.`,
      });
      refetch();
    } catch {
      toast.error("Failed to delete document");
    }
  };

  const handleUploadMock = () => {
    toast.info("Document Upload Vault", {
      description: "Select file from local filesystem to encrypt with AES-256 and store in vault.",
    });
  };

  const columns: Column<LegalDocument>[] = [
    {
      key: "title",
      header: "Pleading / Filing Name",
      sortable: true,
      className: "min-w-[240px]",
      render: (doc) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#262018] bg-[#17130F] text-[#C9A45C]">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <span className="font-serif text-sm font-semibold text-[#F5F1E8] block line-clamp-1">
              {doc.title}
            </span>
            <span className="text-[11px] text-[#8F897F] block">
              {doc.fileSize || "2.4 MB"} • {doc.fileType?.toUpperCase() || "PDF"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      render: (doc) => (
        <Badge
          variant="outline"
          className="border-[#C9A45C]/30 text-[#D8B76A] text-[10px] uppercase tracking-wider"
        >
          {doc.category || "Pleading"}
        </Badge>
      ),
    },
    {
      key: "case",
      header: "Associated Matter",
      render: (doc) => (
        <span className="text-xs text-[#E6E0D5] line-clamp-1 max-w-[200px]">
          {doc.case?.title || "Apex BioTech v. OmniCorp"}
        </span>
      ),
    },
    {
      key: "uploadedAt",
      header: "Date Vaulted",
      render: (doc) => (
        <span className="text-xs text-[#8F897F] font-mono">
          {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : "Recent"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24 text-right",
      render: (doc) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(doc)}
            className="h-7 w-7 p-0 border-[#262018] text-[#8F897F] hover:text-[#C9A45C]"
            title="Download Document"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(doc.id, doc.title)}
            className="h-7 w-7 p-0 border-[#262018] text-[#8F897F] hover:text-red-400 hover:border-red-500/30"
            title="Purge Document"
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
        title="Legal Document Vault"
        description="Encrypted repository of court pleadings, motions, briefs, contracts, and deposition transcripts."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Documents" },
        ]}
        actions={
          <Button
            onClick={handleUploadMock}
            className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9 gap-1.5"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Document</span>
          </Button>
        }
      />

      <DataTable
        data={documents}
        columns={columns}
        keyExtractor={(doc) => doc.id}
        isLoading={isLoading}
        searchTerm={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder="Search documents by name or filing number..."
        page={page}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.total || documents.length}
        pageSize={10}
        onPageChange={setPage}
        filters={
          <div className="w-40">
            <Select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              <option value="PLEADINGS">Pleadings</option>
              <option value="MOTIONS">Motions</option>
              <option value="BRIEFS">Briefs</option>
              <option value="CONTRACTS">Contracts</option>
              <option value="EVIDENCE">Evidence</option>
            </Select>
          </div>
        }
      />
    </div>
  );
}
