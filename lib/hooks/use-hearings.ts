import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { hearingsApi } from "@/lib/api/hearings";
import type { Hearing, QueryParams } from "@/types";

export function useHearings(params?: QueryParams) {
  return useQuery({ queryKey: ["hearings", params], queryFn: () => hearingsApi.getHearings(params) });
}

export function useHearing(id: string) {
  return useQuery({ queryKey: ["hearings", id], queryFn: () => hearingsApi.getHearing(id), enabled: !!id });
}

export function useCreateHearing() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Hearing>) => hearingsApi.createHearing(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["hearings"] }); } });
}

export function useUpdateHearing() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Hearing> }) => hearingsApi.updateHearing(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["hearings"] }); } });
}

export function useDeleteHearing() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => hearingsApi.deleteHearing(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["hearings"] }); } });
}
