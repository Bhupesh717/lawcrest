"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { clientSchema, type ClientFormData } from "@/lib/validations/client";
import { useCreateClient } from "@/lib/hooks/use-clients";

export default function NewClientPage() {
  const router = useRouter();
  const createMutation = useCreateClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: ClientFormData) => {
    try {
      await createMutation.mutateAsync(data as any);
      toast.success("Client Registered", {
        description: "Client entity added to firm billing and conflict registry.",
      });
      router.push("/admin/clients");
    } catch {
      toast.error("Failed to register client");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Register New Client Entity"
        description="Add a corporate entity or individual client to the LAWCREST conflict database."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Clients", href: "/admin/clients" },
          { label: "New Client" },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-[#262018] bg-[#14110E] p-6 sm:p-8 space-y-6 shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Client / Entity Name *
            </label>
            <Input
              placeholder="e.g. Apex BioTech Holdings Inc."
              {...register("name")}
              className={errors.name ? "border-red-500/50" : ""}
            />
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Parent Company / Affiliation
            </label>
            <Input
              placeholder="e.g. Apex Global Consortium"
              {...register("company")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Contact Email *
            </label>
            <Input
              type="email"
              placeholder="e.g. legal@apexbio.com"
              {...register("email")}
              className={errors.email ? "border-red-500/50" : ""}
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Phone Number *
            </label>
            <Input
              type="tel"
              placeholder="e.g. +1 (555) 019-3829"
              {...register("phone")}
              className={errors.phone ? "border-red-500/50" : ""}
            />
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Billing & Registered Address
          </label>
          <Input
            placeholder="e.g. 500 Madison Ave, New York, NY 10022"
            {...register("address")}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Initial Retainer Status
          </label>
          <Select {...register("status")}>
            <option value="ACTIVE">Active Retainer</option>
            <option value="PROSPECTIVE">Prospective Intake</option>
            <option value="INACTIVE">Inactive</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Internal Conflict & Counsel Notes
          </label>
          <Textarea
            rows={3}
            placeholder="Conflict clearance details, corporate counsel contact, billing rates..."
            {...register("notes")}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#221C16]">
          <Link href="/admin/clients">
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
            <span>{isSubmitting ? "Registering..." : "Register Client"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
