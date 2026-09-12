import { apiClient } from "./client";
import type { LegalDocument, QueryParams } from "@/types";

export const documentsApi = {
  getDocuments: (params?: QueryParams) => apiClient.getList<LegalDocument>("/api/documents", params),
  getDocument: (id: string) => apiClient.get<LegalDocument>(`/api/documents/${id}`),
  uploadDocument: (data: Partial<LegalDocument>) => apiClient.post<LegalDocument>("/api/documents", data),
  deleteDocument: (id: string) => apiClient.delete(`/api/documents/${id}`),
};
