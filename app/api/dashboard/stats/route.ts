import { mockDashboardStats, mockMonthlyTrends, mockCaseStatusDistribution, mockRevenueData, mockRecentActivities, mockLawyerPerformance } from "@/lib/mock-data/dashboard";
import { successResponse } from "@/lib/api/route-helpers";

export async function GET() {
  return successResponse({
    stats: mockDashboardStats,
    monthlyTrends: mockMonthlyTrends,
    caseDistribution: mockCaseStatusDistribution,
    revenueData: mockRevenueData,
    recentActivities: mockRecentActivities,
    lawyerPerformance: mockLawyerPerformance,
  });
}
