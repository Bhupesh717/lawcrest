// ──────────────────────────────────────────────
// Blog / Legal Insights Types
// ──────────────────────────────────────────────

export type BlogCategory =
  | "Corporate Law"
  | "Litigation"
  | "Legal Tech"
  | "Regulatory"
  | "Employment"
  | "Real Estate"
  | "Tax"
  | "Opinion";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  authorImage: string;
  image: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
