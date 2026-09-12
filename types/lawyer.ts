// ──────────────────────────────────────────────
// Lawyer Types
// ──────────────────────────────────────────────

export type LawyerSpecialization =
  | "Corporate Law"
  | "Civil Litigation"
  | "Criminal Law"
  | "Family Law"
  | "Real Estate Law"
  | "Employment Law"
  | "Tax & Compliance"
  | "Intellectual Property"
  | "Contract Law"
  | "Legal Consultancy";

export type LawyerStatus = "active" | "on-leave" | "inactive";

export interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  title?: string;
  specializations: LawyerSpecialization[];
  barNumber: string;
  experience: number;
  experienceYears?: number;
  bio: string;
  education: string[];
  image: string;
  avatarUrl?: string;
  status: LawyerStatus;
  activeCases: number;
  activeCasesCount?: number;
  totalCases: number;
  winRate: number;
  caseIds: string[];
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}
