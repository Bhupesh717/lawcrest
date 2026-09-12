"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { lawyerSchema, type LawyerFormData } from "@/lib/validations/lawyer";
import { useCreateLawyer } from "@/lib/hooks/use-lawyers";

export default function NewLawyerPage() {
  const router = useRouter();
  const createMutation = useCreateLawyer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LawyerFormData>({
    resolver: zodResolver(lawyerSchema),
    defaultValues: {
      title: "Partner",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: LawyerFormData) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        avatarUrl:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      } as any);
      toast.success("Attorney Enrolled", {
        description: "New attorney added to the LAWCREST roster.",
      });
      router.push("/admin/lawyers");
    } catch {
      toast.error("Failed to enroll attorney");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Add Attorney to Roster"
        description="Enroll a new trial partner, senior counsel, or litigation associate."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Attorneys", href: "/admin/lawyers" },
          { label: "Add Attorney" },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-[#262018] bg-[#14110E] p-6 sm:p-8 space-y-6 shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Full Legal Name *
            </label>
            <Input
              placeholder="e.g. Victoria K. Sterling"
              {...register("name")}
              className={errors.name ? "border-red-500/50" : ""}
            />
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Firm Title / Role *
            </label>
            <Select {...register("title")}>
              <option value="Senior Partner">Senior Partner</option>
              <option value="Partner">Partner</option>
              <option value="Special Counsel">Special Counsel</option>
              <option value="Senior Associate">Senior Associate</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Official Email Address *
            </label>
            <Input
              type="email"
              placeholder="e.g. vsterling@lawcrest.com"
              {...register("email")}
              className={errors.email ? "border-red-500/50" : ""}
            />
            {errors.email && (
              <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
              Direct Phone *
            </label>
            <Input
              type="tel"
              placeholder="e.g. +1 (212) 555-0182"
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
            Professional Biography
          </label>
          <Textarea
            rows={4}
            placeholder="Experience, past federal roles, trial victories, areas of courtroom authority..."
            {...register("bio")}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#221C16]">
          <Link href="/admin/lawyers">
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
            <span>{isSubmitting ? "Enrolling..." : "Enroll Attorney"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
