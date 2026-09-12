import { apiClient } from "./client";
import type { Task, QueryParams } from "@/types";

export const tasksApi = {
  getTasks: (params?: QueryParams) => apiClient.getList<Task>("/api/tasks", params),
  getTask: (id: string) => apiClient.get<Task>(`/api/tasks/${id}`),
  createTask: (data: Partial<Task>) => apiClient.post<Task>("/api/tasks", data),
  updateTask: (id: string, data: Partial<Task>) => apiClient.put<Task>(`/api/tasks/${id}`, data),
  deleteTask: (id: string) => apiClient.delete(`/api/tasks/${id}`),
};
