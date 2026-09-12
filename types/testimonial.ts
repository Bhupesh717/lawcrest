// ──────────────────────────────────────────────
// Testimonial Types
// ──────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientDesignation: string;
  clientCompany: string;
  clientImage: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}
