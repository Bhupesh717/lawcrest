import { apiClient } from "./client";
import type { Client, QueryParams } from "@/types";

export const clientsApi = {
  getClients: (params?: QueryParams) => apiClient.getList<Client>("/api/clients", params),
  getClient: (id: string) => apiClient.get<Client>(`/api/clients/${id}`),
  createClient: (data: Partial<Client>) => apiClient.post<Client>("/api/clients", data),
  updateClient: (id: string, data: Partial<Client>) => apiClient.put<Client>(`/api/clients/${id}`, data),
  deleteClient: (id: string) => apiClient.delete(`/api/clients/${id}`),
};
