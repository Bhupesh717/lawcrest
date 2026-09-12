import { apiClient } from "./client";
import type { BlogPost, QueryParams } from "@/types";

export const blogApi = {
  getPosts: (params?: QueryParams) => apiClient.getList<BlogPost>("/api/blog", params),
  getPost: (id: string) => apiClient.get<BlogPost>(`/api/blog/${id}`),
};
