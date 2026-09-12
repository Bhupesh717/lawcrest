"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Briefcase,
  Receipt,
  Plus,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { useClient } from "@/lib/hooks/use-clients";

export default function ClientDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError, refetch } = useClient(id);

  const client = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (isError || !client) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <ErrorState
          title="Client Record Not Found"
          message="The requested client file could not be located."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={client.name}
        description={client.company ? `Corporate Retainer • ${client.company}` : "Private Client File"}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Clients", href: "/admin/clients" },
          { label: client.name },
        ]}
        actions={
          <Link href="/admin/cases/new">
            <Button className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-9">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span>Open Matter for Client</span>
            </Button>
          </Link>
        }
      />

      {/* Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Retainer Relationship
          </span>
          <div className="mt-1.5">
            <StatusBadge status={client.status || "ACTIVE"} />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Direct Contact Person
          </span>
          <span className="font-serif text-sm font-bold text-[#F5F1E8] mt-1 block">
            {client.contactPerson || client.name}
          </span>
          <span className="text-[11px] text-[#8F897F] block">General Counsel / Officer</span>
        </div>

        <div className="p-4 rounded-xl border border-[#262018] bg-[#14110E]">
          <span className="text-[11px] text-[#8F897F] uppercase tracking-wider block">
            Active Docket Matters
          </span>
          <span className="font-serif text-base font-bold text-[#C9A45C] mt-1 block">
            {client.activeCasesCount || 1} Active Filings
          </span>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="rounded-xl border border-[#262018] bg-[#14110E] p-6 space-y-6">
        <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-3">
          Entity Coordinates & Corporate Profile
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#B8B0A3]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#C9A45C] shrink-0" />
              <span>Email: <strong className="text-[#F5F1E8]">{client.email}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#C9A45C] shrink-0" />
              <span>Direct Phone: <strong className="text-[#F5F1E8]">{client.phone}</strong></span>
            </div>
            {client.company && (
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-[#C9A45C] shrink-0" />
                <span>Parent Company: <strong className="text-[#F5F1E8]">{client.company}</strong></span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
              <span>Billing Address:<br /><strong className="text-[#F5F1E8]">{client.address || "500 Madison Ave, New York, NY 10022"}</strong></span>
            </div>
          </div>
        </div>

        {client.notes && (
          <div className="border-t border-[#221C16] pt-4">
            <span className="text-[11px] uppercase tracking-wider text-[#8F897F] block mb-1">
              Internal Conflict & Billing Notes
            </span>
            <p className="text-xs text-[#8F897F] leading-relaxed bg-[#17130F] p-3 rounded-lg border border-[#262018]">
              {client.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
