// ──────────────────────────────────────────────
// Document Types
// ──────────────────────────────────────────────

export type DocumentCategory =
  | "contract"
  | "court-filing"
  | "evidence"
  | "correspondence"
  | "invoice"
  | "legal-brief"
  | "agreement"
  | "affidavit"
  | "power-of-attorney"
  | "other";

export type DocumentFileType = "pdf" | "docx" | "xlsx" | "jpg" | "png" | "txt";

export interface LegalDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: DocumentFileType;
  fileSize: number;
  category: DocumentCategory;
  caseId?: string;
  caseName?: string;
  clientId?: string;
  clientName?: string;
  uploadedBy: string;
  description?: string;
  tags: string[];
  uploadedAt: string;
  updatedAt: string;
}
