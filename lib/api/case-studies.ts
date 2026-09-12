import { apiClient } from "./client";
import type { CaseStudy, QueryParams } from "@/types";

export const caseStudiesApi = {
  getCaseStudies: (params?: QueryParams) => apiClient.getList<CaseStudy>("/api/case-studies", params),
  getCaseStudy: (id: string) => apiClient.get<CaseStudy>(`/api/case-studies/${id}`),
};
