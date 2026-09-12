import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { casesApi } from "@/lib/api/cases";
import type { Case, QueryParams } from "@/types";

export function useCases(params?: QueryParams) {
  return useQuery({
    queryKey: ["cases", params],
    queryFn: () => casesApi.getCases(params),
  });
}

export function useCase(id: string) {
  return useQuery({
    queryKey: ["cases", id],
    queryFn: () => casesApi.getCase(id),
    enabled: !!id,
  });
}

export function useCreateCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Case>) => casesApi.createCase(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["cases"] }); },
  });
}

export function useUpdateCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Case> }) => casesApi.updateCase(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["cases"] }); },
  });
}

export function useDeleteCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => casesApi.deleteCase(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["cases"] }); },
  });
}
