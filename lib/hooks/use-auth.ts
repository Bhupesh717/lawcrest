import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import type { AuthCredentials } from "@/types";

export function useLogin() {
  return useMutation({ mutationFn: (credentials: AuthCredentials) => authApi.login(credentials) });
}

export function useCurrentUser() {
  return useQuery({ queryKey: ["auth", "me"], queryFn: () => authApi.me(), retry: false, staleTime: 10 * 60 * 1000 });
}
