// ──────────────────────────────────────────────
// Case Management Types
// ──────────────────────────────────────────────

export type CaseStatus = "active" | "pending" | "closed" | "on-hold" | "under-review";

export type CasePriority = "high" | "medium" | "low" | "urgent";

export type CaseType =
  | "corporate"
  | "civil-litigation"
  | "criminal"
  | "family"
  | "real-estate"
  | "employment"
  | "tax-compliance"
  | "intellectual-property"
  | "contract"
  | "legal-consultancy";

export interface CaseTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "filing" | "hearing" | "document" | "note" | "status-change" | "payment";
}

export interface CaseNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  caseType: CaseType;
  status: CaseStatus;
  priority: CasePriority;
  courtName?: string;
  filingDate: string;
  nextHearingDate?: string;
  closingDate?: string;
  timeline: CaseTimelineEvent[];
  notes: CaseNote[];
  documentIds: string[];
  totalBilled: number;
  totalPaid: number;
  createdAt: string;
  updatedAt: string;
}
