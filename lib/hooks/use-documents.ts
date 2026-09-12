import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsApi } from "@/lib/api/documents";
import type { LegalDocument, QueryParams } from "@/types";

export function useDocuments(params?: QueryParams) {
  return useQuery({ queryKey: ["documents", params], queryFn: () => documentsApi.getDocuments(params) });
}

export function useDocument(id: string) {
  return useQuery({ queryKey: ["documents", id], queryFn: () => documentsApi.getDocument(id), enabled: !!id });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<LegalDocument>) => documentsApi.uploadDocument(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["documents"] }); } });
}

export function useDeleteDocument() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => documentsApi.deleteDocument(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["documents"] }); } });
}
