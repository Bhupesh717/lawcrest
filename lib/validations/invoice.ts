import { z } from "zod";

export const invoiceSchema = z.object({
  caseId: z.string().min(1, "Case is required"),
  clientId: z.string().min(1, "Client is required"),
  lawyerId: z.string().min(1, "Lawyer is required"),
  items: z.array(z.object({
    description: z.string().min(3, "Description is required"),
    hours: z.number().optional(),
    rate: z.number().optional(),
    amount: z.number().min(0, "Amount must be positive"),
  })).min(1, "At least one item is required"),
  tax: z.number().min(0).default(0),
  dueDate: z.string().min(1, "Due date is required"),
  notes: z.string().optional(),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
