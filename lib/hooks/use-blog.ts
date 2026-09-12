import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api/blog";
import type { QueryParams } from "@/types";

export function useBlogs(params?: QueryParams) {
  return useQuery({ queryKey: ["blog", params], queryFn: () => blogApi.getPosts(params) });
}

export function useBlog(id: string) {
  return useQuery({ queryKey: ["blog", id], queryFn: () => blogApi.getPost(id), enabled: !!id });
}
