import { apiClient } from "./client";
import type { Lawyer, QueryParams } from "@/types";

export const lawyersApi = {
  getLawyers: (params?: QueryParams) => apiClient.getList<Lawyer>("/api/lawyers", params),
  getLawyer: (id: string) => apiClient.get<Lawyer>(`/api/lawyers/${id}`),
  createLawyer: (data: Partial<Lawyer>) => apiClient.post<Lawyer>("/api/lawyers", data),
  updateLawyer: (id: string, data: Partial<Lawyer>) => apiClient.put<Lawyer>(`/api/lawyers/${id}`, data),
  deleteLawyer: (id: string) => apiClient.delete(`/api/lawyers/${id}`),
};
