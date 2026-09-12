import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesApi } from "@/lib/api/invoices";
import type { Invoice, QueryParams } from "@/types";

export function useInvoices(params?: QueryParams) {
  return useQuery({ queryKey: ["invoices", params], queryFn: () => invoicesApi.getInvoices(params) });
}

export function useInvoice(id: string) {
  return useQuery({ queryKey: ["invoices", id], queryFn: () => invoicesApi.getInvoice(id), enabled: !!id });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Invoice>) => invoicesApi.createInvoice(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["invoices"] }); } });
}

export function useUpdateInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Invoice> }) => invoicesApi.updateInvoice(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["invoices"] }); } });
}

export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => invoicesApi.deleteInvoice(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["invoices"] }); } });
}
