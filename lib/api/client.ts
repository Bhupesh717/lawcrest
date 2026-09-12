// ──────────────────────────────────────────────
// Centralized API Client
// ──────────────────────────────────────────────
// All API calls flow through this client.
// When the real backend is ready, simply set
// NEXT_PUBLIC_API_BASE_URL to the backend URL.
// ──────────────────────────────────────────────

import type { ApiResponse, PaginatedResponse, QueryParams } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function buildQueryString(params?: QueryParams): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      success: false,
      message: `Request failed with status ${response.status}`,
    }));
    throw new Error(error.message || "An unexpected error occurred");
  }
  return response.json();
}

export const apiClient = {
  async get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}${buildQueryString(params)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<ApiResponse<T>>(response);
  },

  async getList<T>(endpoint: string, params?: QueryParams): Promise<PaginatedResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}${buildQueryString(params)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<PaginatedResponse<T>>(response);
  },

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse<ApiResponse<T>>(response);
  },

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse<T>>(response);
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return handleResponse<ApiResponse<T>>(response);
  },
};
