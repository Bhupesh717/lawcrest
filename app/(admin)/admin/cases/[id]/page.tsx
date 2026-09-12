"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Trash2,
  Edit,
  Building,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { useCase, useUpdateCase, useDeleteCase } from "@/lib/hooks/use-cases";
import { toast } from "sonner";

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data, isLoading, isError, refetch } = useCase(id);
  const updateMutation = useUpdateCase();
  const deleteMutation = useDeleteCase();

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const c = data?.data;

  const handleStatusChange = async (newStatus: string) => {
    if (!c) return;
    try {
      await updateMutation.mutateAsync({
        id: c.id,
        data: { status: newStatus as any },
      });
      toast.success("Case Status Updated", {
        description: `Matter status transitioned to ${newStatus.replace(/_/g, " ")}.`,
      });
      refetch();
    } catch {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async () => {
    if (!c) return;
    try {
      await deleteMutation.mutateAsync(c.id);
      toast.success("Case Matter Archived");
      router.push("/admin/cases");
    } catch {
      toast.error("Failed to archive case");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (isError || !c) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <ErrorState
          title="Case Matter Not Found"
          message="The requested docket entry could not be retrieved from the active database."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        title={c.title}
        description={`Docket No: ${c.caseNumber} • ${c.practiceArea || c.type || "Commercial Litigation"}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Cases", href: "/admin/cases" },
          { label: c.caseNumber },
        ]}
        actions={
          <div className="flex items-center gap-3">
            {/* Quick Status Dropdown */}
            <div className="w-40">
              <Select
                value={c.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="OPEN">Status: Open</option>
                <option value="IN_PROGRESS">Status: In Progress</option>
                <option value="PENDING_HEARING">Status: Hearing Pending</option>
                <option value="ON_HOLD">Status: On Hold</option>
                <option value="RESOLVED">Status: Resolved</option>
                <option value="CLOSED">Status: Closed</option>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 h-10"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              <span>Archive</span>
            </Button>
          </div>
        }
      />

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Matter Status
          </span>
          <div className="mt-1.5 flex items-center gap-2">
            <StatusBadge status={c.status} />
            <PriorityBadge priority={c.priority} size="sm" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Principal Client
          </span>
          <span className="font-serif text-sm font-bold text-[#F5F1E8] mt-1 block truncate">
            {c.client?.name || "Confidential Corporate Client"}
          </span>
          <span className="text-[11px] text-[#8F897F] block truncate">
            {c.client?.email || "Retained Corporation"}
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Lead Trial Counsel
          </span>
          <span className="font-serif text-sm font-bold text-[#D8B76A] mt-1 block truncate">
            {c.assignedLawyer?.name || "Senior Litigation Partner"}
          </span>
          <span className="text-[11px] text-[#8F897F] block">
            {c.assignedLawyer?.title || "Partner"}
          </span>
        </div>

        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Estimated Value / Exposure
          </span>
          <span className="font-serif text-base font-bold text-[#F5F1E8] mt-1 block">
            {c.value ? `$${c.value.toLocaleString()}` : "$24,500,000"}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">
            Retainer Active & Funded
          </span>
        </div>
      </div>

      {/* Detail Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="bg-[#14110E] border border-[#262018]">
          <TabsTrigger value="overview">Matter Overview</TabsTrigger>
          <TabsTrigger value="client">Client & Parties</TabsTrigger>
          <TabsTrigger value="hearings">Court Hearings</TabsTrigger>
          <TabsTrigger value="documents">Document Vault</TabsTrigger>
          <TabsTrigger value="billing">Invoices & Fees</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8] mb-2">
                Matter Summary & Core Allegations
              </h3>
              <p className="text-sm text-[#B8B0A3] leading-relaxed">
                {c.description ||
                  "Comprehensive litigation matter involving cross-jurisdictional breach of fiduciary duties, patent infringement assertions, and commercial contract claims filed in federal district court."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#221C16] pt-6 text-xs">
              <div className="space-y-3">
                <div className="flex justify-between py-1.5 border-b border-[#1E1914]">
                  <span className="text-[#8F897F]">Filing Jurisdiction:</span>
                  <span className="text-[#E6E0D5] font-medium">{c.court || "U.S. District Court, SDNY"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#1E1914]">
                  <span className="text-[#8F897F]">Presiding Judge:</span>
                  <span className="text-[#E6E0D5] font-medium">{c.judge || "Hon. Victoria K. Vance"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#1E1914]">
                  <span className="text-[#8F897F]">Date Commenced:</span>
                  <span className="text-[#E6E0D5] font-medium">{c.startDate ? new Date(c.startDate).toLocaleDateString() : "March 15, 2025"}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-1.5 border-b border-[#1E1914]">
                  <span className="text-[#8F897F]">Opposing Party:</span>
                  <span className="text-[#E6E0D5] font-medium">{c.opposingParty || "OmniCorp International Holdings"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#1E1914]">
                  <span className="text-[#8F897F]">Opposing Counsel:</span>
                  <span className="text-[#E6E0D5] font-medium">{c.opposingCounsel || "Gibson, Dunn & Crutcher LLP"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#1E1914]">
                  <span className="text-[#8F897F]">Next Status Conference:</span>
                  <span className="text-[#C9A45C] font-semibold">{c.nextHearingDate ? new Date(c.nextHearingDate).toLocaleDateString() : "Next Tuesday, 10:00 AM"}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Client */}
        <TabsContent value="client">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
              Client Entity Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-[#8F897F] block">Entity Name:</span>
                  <span className="font-semibold text-[#F5F1E8]">{c.client?.name || "Acme Technologies LLC"}</span>
                </div>
                <div>
                  <span className="text-xs text-[#8F897F] block">Primary Representative:</span>
                  <span className="text-[#E6E0D5]">{c.client?.contactPerson || "Chief Legal Officer"}</span>
                </div>
                <div>
                  <span className="text-xs text-[#8F897F] block">Contact Email:</span>
                  <span className="text-[#C9A45C]">{c.client?.email || "legal@acmetech.com"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-xs text-[#8F897F] block">Telephone:</span>
                  <span className="text-[#E6E0D5]">{c.client?.phone || "+1 (555) 392-0192"}</span>
                </div>
                <div>
                  <span className="text-xs text-[#8F897F] block">Billing Address:</span>
                  <span className="text-[#8F897F]">{c.client?.address || "500 Madison Ave, New York, NY 10022"}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Hearings */}
        <TabsContent value="hearings">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#221C16]">
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Court Docket & Oral Arguments
              </h3>
              <Link href="/admin/hearings">
                <Button size="sm" variant="outline" className="border-[#C9A45C]/40 text-[#C9A45C]">
                  View Full Docket Calendar
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-[#221C16] bg-[#17130F] flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#F5F1E8] block">Oral Argument on Motion to Dismiss</span>
                  <span className="text-xs text-[#8F897F]">SDNY Courtroom 412 • Hon. Victoria K. Vance</span>
                </div>
                <StatusBadge status="SCHEDULED" />
              </div>
              <div className="p-4 rounded-lg border border-[#221C16] bg-[#17130F] flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#F5F1E8] block">Initial Pretrial Discovery Conference</span>
                  <span className="text-xs text-[#8F897F]">Completed on February 10, 2026</span>
                </div>
                <StatusBadge status="COMPLETED" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Documents */}
        <TabsContent value="documents">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#221C16]">
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Pleadings, Exhibits & Filings
              </h3>
              <Link href="/admin/documents">
                <Button size="sm" variant="outline" className="border-[#C9A45C]/40 text-[#C9A45C]">
                  Open Legal Document Vault
                </Button>
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border border-[#221C16] bg-[#17130F] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#C9A45C]" />
                  <span className="text-[#E6E0D5] font-medium">Verified Complaint & Demand for Jury Trial.pdf</span>
                </div>
                <span className="text-[#8F897F]">1.4 MB • Pleading</span>
              </div>
              <div className="p-3 rounded-lg border border-[#221C16] bg-[#17130F] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#C9A45C]" />
                  <span className="text-[#E6E0D5] font-medium">Memorandum of Law in Support of Motion.pdf</span>
                </div>
                <span className="text-[#8F897F]">3.2 MB • Motion</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 5: Billing */}
        <TabsContent value="billing">
          <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#221C16]">
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Invoices & Retainer Statements
              </h3>
              <Link href="/admin/billing">
                <Button size="sm" variant="outline" className="border-[#C9A45C]/40 text-[#C9A45C]">
                  View All Invoices
                </Button>
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border border-[#221C16] bg-[#17130F] flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#F5F1E8] block">Invoice #INV-2026-084</span>
                  <span className="text-xs text-[#8F897F]">Trial Preparation Retainer (February 2026)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm font-bold text-[#D8B76A]">$65,000.00</span>
                  <StatusBadge status="PAID" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Archive Matter Permanently?"
        description={`Are you sure you want to archive matter "${c.title}"? Linked docket records and calendar entries will be preserved in archived records.`}
        confirmText="Confirm Archive"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
