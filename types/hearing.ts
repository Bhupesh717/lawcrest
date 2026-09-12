// ──────────────────────────────────────────────
// Hearing Types
// ──────────────────────────────────────────────

export type HearingStatus = "scheduled" | "completed" | "adjourned" | "cancelled";

export interface Hearing {
  id: string;
  title: string;
  caseId: string;
  caseName: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  courtName: string;
  courtRoom?: string;
  judge?: string;
  date: string;
  time: string;
  duration?: string;
  status: HearingStatus;
  notes?: string;
  outcome?: string;
  createdAt: string;
  updatedAt: string;
}
