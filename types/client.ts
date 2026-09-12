// ──────────────────────────────────────────────
// Client Types
// ──────────────────────────────────────────────

export type ClientStatus = "active" | "inactive" | "prospect";

export type ClientType = "individual" | "corporate" | "government";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  clientType: ClientType;
  status: ClientStatus;
  company?: string;
  designation?: string;
  caseIds: string[];
  totalCases: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
