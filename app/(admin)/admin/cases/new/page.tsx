"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { caseSchema, type CaseFormData } from "@/lib/validations/case";
import { useCreateCase } from "@/lib/hooks/use-cases";
import { useClients } from "@/lib/hooks/use-clients";
import { useLawyers } from "@/lib/hooks/use-lawyers";

export default function NewCasePage() {
  const router = useRouter();
  const createMutation = useCreateCase();
  const { data: clientsData } = useClients({ limit: 50 });
  const { data: lawyersData } = useLawyers({ limit: 50 });

  const clients = clientsData?.data || [];
  const lawyers = lawyersData?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      status: "OPEN",
      priority: "MEDIUM",
      type: "Commercial Litigation",
      practiceArea: "Litigation",
    },
  });

  const onSubmit = async (data: CaseFormData) => {
    try {
      const result = await createMutation.mutateAsync({
        ...data,
        caseNumber: `LC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        startDate: new Date().toISOString(),
      } as any);

      toast.success("Legal Matter Opened", {
        description: `Matter created successfully with docket number.`,
      });
      router.push(`/admin/cases`);
    } catch {
      toast.error("Failed to create case matter");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Open New Legal Matter"
        description="Initialize a new client litigation file, assign lead partner, and establish court docket parameters."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Cases", href: "/admin/cases" },
          { label: "New Matter" },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-[#262018] bg-[#14110E] p-6 sm:p-8 space-y-6 shadow-xl"
      >
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
            1. Matter Identification & Title
          </h3>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Matter Caption / Title *
            </label>
            <Input
              placeholder="e.g. Apex BioTech v. OmniCorp Pharmaceutical Holdings"
              {...register("title")}
              className={errors.title ? "border-red-500/50" : ""}
            />
            {errors.title && (
              <p className="text-[11px] text-red-400 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Matter Description & Factual Allegations *
            </label>
            <Textarea
              rows={4}
              placeholder="Comprehensive summary of allegations, contractual clauses, or statutory violations at issue..."
              {...register("description")}
              className={errors.description ? "border-red-500/50" : ""}
            />
            {errors.description && (
              <p className="text-[11px] text-red-400 mt-1">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#221C16]">
          <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
            2. Parties & Assigned Counsel
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Retaining Client *
              </label>
              <Select {...register("clientId")} placeholder="Select client...">
                <option value="">Select retained client entity...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} ({client.company || "Individual"})
                  </option>
                ))}
              </Select>
              {errors.clientId && (
                <p className="text-[11px] text-red-400 mt-1">{errors.clientId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Lead Trial Attorney *
              </label>
              <Select {...register("assignedLawyerId")} placeholder="Select attorney...">
                <option value="">Assign lead partner...</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name} — {lawyer.title || "Partner"}
                  </option>
                ))}
              </Select>
              {errors.assignedLawyerId && (
                <p className="text-[11px] text-red-400 mt-1">{errors.assignedLawyerId.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#221C16]">
          <h3 className="font-serif text-base font-bold text-[#F5F1E8] border-b border-[#221C16] pb-2">
            3. Docket Classification & Urgency
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Initial Status
              </label>
              <Select {...register("status")}>
                <option value="OPEN">Open / Intake</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="PENDING_HEARING">Hearing Pending</option>
                <option value="ON_HOLD">On Hold</option>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Trial Priority
              </label>
              <Select {...register("priority")}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent / Injunction</option>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
                Practice Area
              </label>
              <Select {...register("practiceArea")}>
                <option value="Litigation">Commercial Litigation</option>
                <option value="Corporate">Corporate Governance</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="White Collar">White Collar Defense</option>
                <option value="Securities">Securities & Antitrust</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#221C16]">
          <Link href="/admin/cases">
            <Button
              type="button"
              variant="outline"
              className="border-[#262018] text-[#8F897F] hover:text-[#F5F1E8]"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting || createMutation.isPending}
            className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-10 px-6 gap-2"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? "Opening Matter..." : "Open Matter"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
