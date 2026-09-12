import { apiClient } from "./client";
import type { AuthResponse, AuthCredentials, User } from "@/types";

export const authApi = {
  login: (credentials: AuthCredentials) => apiClient.post<AuthResponse>("/api/auth/login", credentials),
  logout: () => apiClient.post("/api/auth/logout"),
  me: () => apiClient.get<User>("/api/auth/me"),
};
