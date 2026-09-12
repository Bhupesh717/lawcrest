// ──────────────────────────────────────────────
// Case Study Types
// ──────────────────────────────────────────────

export type CaseStudyCategory =
  | "corporate"
  | "litigation"
  | "real-estate"
  | "employment"
  | "intellectual-property"
  | "family"
  | "criminal";

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  category: CaseStudyCategory;
  shortDescription: string;
  challenge: string;
  approach: string;
  result: string;
  outcome: string;
  image: string;
  clientIndustry: string;
  duration: string;
  practiceAreas: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
