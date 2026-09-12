// ──────────────────────────────────────────────
// User / Auth Types
// ──────────────────────────────────────────────

export type UserRole = "admin" | "lawyer" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  designation: string;
  phone?: string;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
