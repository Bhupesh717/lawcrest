import { apiClient } from "./client";
import type { Service, QueryParams } from "@/types";

export const servicesApi = {
  getServices: (params?: QueryParams) => apiClient.getList<Service>("/api/services", params),
  getService: (id: string) => apiClient.get<Service>(`/api/services/${id}`),
};
