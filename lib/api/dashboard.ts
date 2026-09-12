import { apiClient } from "./client";
import type { DashboardStats, MonthlyTrend, CaseStatusDistribution, RecentActivity } from "@/types";

export interface DashboardData {
  stats: DashboardStats;
  monthlyTrends: MonthlyTrend[];
  caseDistribution: CaseStatusDistribution[];
  recentActivities: RecentActivity[];
  revenueData: { month: string; revenue: number; collected: number }[];
  lawyerPerformance: { name: string; activeCases: number; winRate: number; revenue: number }[];
}

export const dashboardApi = {
  getStats: () => apiClient.get<DashboardData>("/api/dashboard/stats"),
};
