import { z } from "zod";

export const caseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  clientId: z.string().min(1, "Client is required"),
  lawyerId: z.string().min(1, "Lawyer is required"),
  caseType: z.enum(["corporate", "civil-litigation", "criminal", "family", "real-estate", "employment", "tax-compliance", "intellectual-property", "contract", "legal-consultancy"]),
  status: z.enum(["active", "pending", "closed", "on-hold", "under-review"]).default("pending"),
  priority: z.enum(["high", "medium", "low", "urgent"]).default("medium"),
  courtName: z.string().optional(),
  filingDate: z.string().min(1, "Filing date is required"),
  nextHearingDate: z.string().optional(),
});

export type CaseFormData = z.infer<typeof caseSchema>;
