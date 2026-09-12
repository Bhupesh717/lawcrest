import { apiClient } from "./client";
import type { Invoice, QueryParams } from "@/types";

export const invoicesApi = {
  getInvoices: (params?: QueryParams) => apiClient.getList<Invoice>("/api/invoices", params),
  getInvoice: (id: string) => apiClient.get<Invoice>(`/api/invoices/${id}`),
  createInvoice: (data: Partial<Invoice>) => apiClient.post<Invoice>("/api/invoices", data),
  updateInvoice: (id: string, data: Partial<Invoice>) => apiClient.put<Invoice>(`/api/invoices/${id}`, data),
  deleteInvoice: (id: string) => apiClient.delete(`/api/invoices/${id}`),
};
