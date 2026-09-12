import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api/tasks";
import type { Task, QueryParams } from "@/types";

export function useTasks(params?: QueryParams) {
  return useQuery({ queryKey: ["tasks", params], queryFn: () => tasksApi.getTasks(params) });
}

export function useTask(id: string) {
  return useQuery({ queryKey: ["tasks", id], queryFn: () => tasksApi.getTask(id), enabled: !!id });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: Partial<Task>) => tasksApi.createTask(data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["tasks"] }); } });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) => tasksApi.updateTask(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["tasks"] }); } });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => tasksApi.deleteTask(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ["tasks"] }); } });
}
