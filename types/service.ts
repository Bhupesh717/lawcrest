// ──────────────────────────────────────────────
// Service / Practice Area Types
// ──────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  image: string;
  order: number;
  caseCount?: number;
  createdAt: string;
  updatedAt: string;
}
