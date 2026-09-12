import { useQuery } from "@tanstack/react-query";
import { caseStudiesApi } from "@/lib/api/case-studies";
import type { QueryParams } from "@/types";

export function useCaseStudies(params?: QueryParams) {
  return useQuery({ queryKey: ["case-studies", params], queryFn: () => caseStudiesApi.getCaseStudies(params) });
}

export function useCaseStudy(id: string) {
  return useQuery({ queryKey: ["case-studies", id], queryFn: () => caseStudiesApi.getCaseStudy(id), enabled: !!id });
}
