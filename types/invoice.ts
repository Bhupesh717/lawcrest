// ──────────────────────────────────────────────
// Invoice / Billing Types
// ──────────────────────────────────────────────

export type PaymentStatus = "paid" | "pending" | "overdue" | "partial" | "cancelled";

export interface InvoiceItem {
  id: string;
  description: string;
  hours?: number;
  rate?: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  caseId: string;
  caseName: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: PaymentStatus;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
