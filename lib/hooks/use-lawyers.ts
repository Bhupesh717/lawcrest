import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lawyersApi } from "@/lib/api/lawyers";
import type { Lawyer, QueryParams } from "@/types";

export function useLawyers(params?: QueryParams) {
  return useQuery({ queryKey: ["lawyers", params], queryFn: () => lawyersApi.getLawyers(params) });
}

export function useLawyer(id: string) {
  return useQuery({ queryKey: ["lawyers", id], queryFn: () => lawyersApi.getLawyer(id), enabled: !!id });
}

export function useCreateLawyer() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Lawyer>) => lawyersApi.createLawyer(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["lawyers"] }); } });
}

export function useUpdateLawyer() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Lawyer> }) => lawyersApi.updateLawyer(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["lawyers"] }); } });
}

export function useDeleteLawyer() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => lawyersApi.deleteLawyer(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["lawyers"] }); } });
}
