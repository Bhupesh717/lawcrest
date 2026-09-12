import { apiClient } from "./client";
import type { Hearing, QueryParams } from "@/types";

export const hearingsApi = {
  getHearings: (params?: QueryParams) => apiClient.getList<Hearing>("/api/hearings", params),
  getHearing: (id: string) => apiClient.get<Hearing>(`/api/hearings/${id}`),
  createHearing: (data: Partial<Hearing>) => apiClient.post<Hearing>("/api/hearings", data),
  updateHearing: (id: string, data: Partial<Hearing>) => apiClient.put<Hearing>(`/api/hearings/${id}`, data),
  deleteHearing: (id: string) => apiClient.delete(`/api/hearings/${id}`),
};
