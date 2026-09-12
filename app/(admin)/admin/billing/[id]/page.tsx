"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
  Scale,
  Building,
  Mail,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { useInvoice, useUpdateInvoice } from "@/lib/hooks/use-invoices";
import { toast } from "sonner";

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useInvoice(id);
  const updateMutation = useUpdateInvoice();

  const inv = data?.data;

  const handleMarkPaid = async () => {
    if (!inv) return;
    try {
      await updateMutation.mutateAsync({
        id: inv.id,
        data: { status: "PAID" },
      });
      toast.success("Invoice Reconciled", {
        description: `Marked invoice ${inv.invoiceNumber} as PAID in full.`,
      });
      refetch();
    } catch {
      toast.error("Failed to update invoice");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (isError || !inv) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <ErrorState
          title="Invoice Record Not Found"
          message="Could not find fee statement."
          onRetry={refetch}
        />
      </div>
    );
  }

  const items = inv.items && inv.items.length > 0 ? inv.items : [
    { description: "Lead Partner Trial Appearance (Motion to Dismiss)", hours: 12, rate: 1250, amount: 15000 },
    { description: "Senior Associate Drafting of Appellate Brief", hours: 28, rate: 750, amount: 21000 },
    { description: "Electronic Discovery Processing & Exhibit Production", hours: 45, rate: 400, amount: 18000 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.08875;
  const total = inv.total || (subtotal + tax);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={`Invoice ${inv.invoiceNumber}`}
        description={`Issued for ${inv.client?.name || "Corporate Client"}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Billing", href: "/admin/billing" },
          { label: inv.invoiceNumber },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="border-[#262018] text-[#8F897F] hover:text-[#C9A45C] gap-1.5 h-9"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Statement</span>
            </Button>
            {inv.status !== "PAID" && (
              <Button
                size="sm"
                onClick={handleMarkPaid}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider h-9 gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Mark Paid</span>
              </Button>
            )}
          </div>
        }
      />

      {/* Printable Invoice Sheet */}
      <div className="rounded-2xl border border-[#262018] bg-[#14110E] p-8 sm:p-12 shadow-2xl space-y-8">
        {/* Header with Law Firm Brand and Status */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-[#262018] pb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-[#C9A45C] bg-[#17130F] text-[#C9A45C]">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-[#F5F1E8]">
                LAW<span className="text-[#C9A45C]">CREST</span>
              </span>
            </div>
            <p className="text-xs text-[#8F897F] leading-relaxed">
              350 Fifth Avenue, 58th Floor<br />
              New York, NY 10118<br />
              +1 (212) 555-0190 • billing@lawcrest.com
            </p>
          </div>

          <div className="text-right sm:text-right">
            <div className="mb-2">
              <StatusBadge status={inv.status} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#F5F1E8]">
              {inv.invoiceNumber}
            </h2>
            <p className="text-xs text-[#8F897F] mt-1 font-mono">
              Issue Date: {inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : "March 1, 2026"}<br />
              Due Date: {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "March 31, 2026"}
            </p>
          </div>
        </div>

        {/* Bill To & Matter Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-[#B8B0A3]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F897F] block mb-2">
              Billed Client Entity:
            </span>
            <h4 className="font-serif text-base font-bold text-[#F5F1E8]">
              {inv.client?.name || "Apex BioTech Holdings LLC"}
            </h4>
            <p className="mt-1 leading-relaxed">
              Attn: General Counsel<br />
              {inv.client?.address || "500 Madison Ave, New York, NY 10022"}<br />
              {inv.client?.email || "legal@apexbio.com"}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F897F] block mb-2">
              Litigation Matter Reference:
            </span>
            <h4 className="font-serif text-sm font-bold text-[#D8B76A]">
              {inv.case?.title || "Apex BioTech v. OmniCorp Pharmaceutical Holdings"}
            </h4>
            <p className="mt-1 leading-relaxed">
              Matter Docket: {inv.case?.caseNumber || "LC-2026-4821"}<br />
              Lead Partner: Alexander Drake, Esq.<br />
              Terms: Net 30 Days Wire Transfer
            </p>
          </div>
        </div>

        {/* Itemized Services Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#262018] bg-[#191511] text-[#8F897F] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-3">Professional Services & Description</th>
                <th className="py-3 px-3 text-right">Billable Hours</th>
                <th className="py-3 px-3 text-right">Hourly Rate</th>
                <th className="py-3 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#221C16]">
              {items.map((item, idx) => (
                <tr key={idx} className="text-[#E6E0D5]">
                  <td className="py-3 px-3 font-medium">{item.description}</td>
                  <td className="py-3 px-3 text-right font-mono">{item.hours} hrs</td>
                  <td className="py-3 px-3 text-right font-mono">${item.rate.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold">${item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Totals */}
        <div className="border-t border-[#262018] pt-4 flex flex-col items-end space-y-2 text-xs">
          <div className="flex justify-between w-64 text-[#8F897F]">
            <span>Services Subtotal:</span>
            <span className="font-mono text-[#F5F1E8]">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between w-64 text-[#8F897F]">
            <span>Disbursements & Tax:</span>
            <span className="font-mono text-[#F5F1E8]">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 pt-2 border-t border-[#262018] text-sm font-bold">
            <span className="text-[#F5F1E8]">Total Due:</span>
            <span className="font-serif text-lg text-[#C9A45C] font-mono">${total.toLocaleString()}</span>
          </div>
        </div>

        {/* Wire instructions */}
        <div className="p-4 rounded-xl border border-[#221C16] bg-[#0E0C0A] text-xs text-[#8F897F]">
          <span className="font-semibold text-[#E6E0D5] block mb-1">
            Wire Remittance Instructions
          </span>
          <p className="font-mono text-[11px] leading-relaxed">
            Bank: J.P. Morgan Chase Bank, N.A. • ABA Routing: 021000021<br />
            Account: LAWCREST IOLTA Client Trust Account #894-019283-01<br />
            Reference Invoice #{inv.invoiceNumber} with wire transmission.
          </p>
        </div>
      </div>
    </div>
  );
}
