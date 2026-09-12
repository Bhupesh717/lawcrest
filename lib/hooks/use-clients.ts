import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientsApi } from "@/lib/api/clients";
import type { Client, QueryParams } from "@/types";

export function useClients(params?: QueryParams) {
  return useQuery({ queryKey: ["clients", params], queryFn: () => clientsApi.getClients(params) });
}

export function useClient(id: string) {
  return useQuery({ queryKey: ["clients", id], queryFn: () => clientsApi.getClient(id), enabled: !!id });
}

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Client>) => clientsApi.createClient(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["clients"] }); } });
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Client> }) => clientsApi.updateClient(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["clients"] }); } });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => clientsApi.deleteClient(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["clients"] }); } });
}
