import { z } from "zod";

export const hearingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  caseId: z.string().min(1, "Case is required"),
  lawyerId: z.string().min(1, "Lawyer is required"),
  courtName: z.string().min(2, "Court name is required"),
  courtRoom: z.string().optional(),
  judge: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().optional(),
  status: z.enum(["scheduled", "completed", "adjourned", "cancelled"]).default("scheduled"),
  notes: z.string().optional(),
});

export type HearingFormData = z.infer<typeof hearingSchema>;
