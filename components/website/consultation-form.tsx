"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { contactApi } from "@/lib/api/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const practiceOptions = [
  { value: "corporate", label: "Corporate Governance & M&A" },
  { value: "litigation", label: "Complex Commercial Litigation" },
  { value: "ip", label: "Intellectual Property & Patent Disputes" },
  { value: "white_collar", label: "White Collar Criminal Defense" },
  { value: "securities", label: "Securities & Regulatory Enforcement" },
  { value: "employment", label: "Executive Employment & Labor" },
  { value: "other", label: "Other High-Stakes Matter" },
];

export function ConsultationForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await contactApi.submitContact(data);
      setSubmitted(true);
      toast.success("Consultation Request Received", {
        description:
          "A partner from LAWCREST will review your inquiry under strict confidentiality within 2 business hours.",
      });
      reset();
    } catch (error) {
      toast.error("Submission Failed", {
        description: "Could not send your request. Please call us directly at +1 (212) 555-0190.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#C9A45C]/40 bg-[#14110E] p-8 sm:p-10 text-center shadow-xl animate-in fade-in duration-300">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A45C]/30 bg-[#C9A45C]/15 text-[#C9A45C] mx-auto mb-5">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#F5F1E8] mb-3">
          Request Received With Privilege
        </h3>
        <p className="text-sm text-[#8F897F] leading-relaxed max-w-md mx-auto mb-6">
          Thank you for reaching out. Your transmission has been routed to our intake partner under attorney-client privilege. We will respond promptly.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="border-[#2E2519] bg-[#1A1612] text-[#E6E0D5] hover:text-[#C9A45C]"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-[#262018] bg-[#14110E] p-7 sm:p-9 shadow-2xl space-y-5"
    >
      <div className="border-b border-[#221C16] pb-4 mb-2">
        <h3 className="font-serif text-xl font-bold text-[#F5F1E8]">
          Request A Confidential Case Evaluation
        </h3>
        <p className="text-xs text-[#8F897F] mt-1">
          All communications are strictly protected by attorney-client privilege.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Full Name *
          </label>
          <Input
            placeholder="e.g. Eleanor Vance"
            {...register("name")}
            className={errors.name ? "border-red-500/50" : ""}
          />
          {errors.name && (
            <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="e.g. evance@vanceholdings.com"
            {...register("email")}
            className={errors.email ? "border-red-500/50" : ""}
          />
          {errors.email && (
            <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="e.g. +1 (555) 019-2834"
            {...register("phone")}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
            Area of Law
          </label>
          <Select {...register("service")} placeholder="Select practice area...">
            {practiceOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#14110E] text-[#F5F1E8]">
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A3] mb-1.5">
          Case Brief & Objectives *
        </label>
        <Textarea
          rows={4}
          placeholder="Briefly describe the circumstances, opposing parties, jurisdictions, and your timeline..."
          {...register("message")}
          className={errors.message ? "border-red-500/50" : ""}
        />
        {errors.message && (
          <p className="text-[11px] text-red-400 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-[#8F897F] pt-1">
        <ShieldCheck className="h-4 w-4 text-[#C9A45C] shrink-0" />
        <span>Submissions are encrypted and subject to conflict checks before review.</span>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest h-12 shadow-[0_0_20px_rgba(201,164,92,0.25)] transition-all"
      >
        {isSubmitting ? (
          "Transmitting Encrypted Inquiry..."
        ) : (
          <>
            <span>Submit Privileged Evaluation Request</span>
            <Send className="ml-2 h-3.5 w-3.5" />
          </>
        )}
      </Button>
    </form>
  );
}
