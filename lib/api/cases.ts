import { apiClient } from "./client";
import type { Case, QueryParams } from "@/types";

export const casesApi = {
  getCases: (params?: QueryParams) => apiClient.getList<Case>("/api/cases", params),
  getCase: (id: string) => apiClient.get<Case>(`/api/cases/${id}`),
  createCase: (data: Partial<Case>) => apiClient.post<Case>("/api/cases", data),
  updateCase: (id: string, data: Partial<Case>) => apiClient.put<Case>(`/api/cases/${id}`, data),
  deleteCase: (id: string) => apiClient.delete(`/api/cases/${id}`),
};
