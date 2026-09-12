import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import type { QueryParams } from "@/types";

export function useServices(params?: QueryParams) {
  return useQuery({ queryKey: ["services", params], queryFn: () => servicesApi.getServices(params) });
}

export function useService(id: string) {
  return useQuery({ queryKey: ["services", id], queryFn: () => servicesApi.getService(id), enabled: !!id });
}
