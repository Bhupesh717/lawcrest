import type { DashboardStats, MonthlyTrend, CaseStatusDistribution, RecentActivity } from "@/types/dashboard";

export const mockDashboardStats: DashboardStats = {
  totalCases: 20,
  activeCases: 12,
  pendingCases: 4,
  closedCases: 1,
  upcomingHearings: 10,
  totalClients: 15,
  activeClients: 12,
  totalLawyers: 10,
  outstandingInvoices: 222000,
  totalRevenue: 1235000,
  monthlyRevenue: 186000,
  pendingTasks: 8,
  caseGrowthPercent: 12.5,
  revenueGrowthPercent: 8.3,
};

export const mockMonthlyTrends: MonthlyTrend[] = [
  { month: "Apr", opened: 8, closed: 5 },
  { month: "May", opened: 11, closed: 7 },
  { month: "Jun", opened: 9, closed: 6 },
  { month: "Jul", opened: 14, closed: 8 },
  { month: "Aug", opened: 12, closed: 7 },
  { month: "Sep", opened: 16, closed: 10 },
];

export const mockCaseStatusDistribution: CaseStatusDistribution[] = [
  { status: "Active", count: 12, color: "#C9A45C" },
  { status: "Pending", count: 4, color: "#B89552" },
  { status: "Under Review", count: 1, color: "#8F743F" },
  { status: "On Hold", count: 1, color: "#705A37" },
  { status: "Closed", count: 1, color: "#4A3D28" },
];

export const mockRevenueData = [
  { month: "Apr", revenue: 142000, collected: 118000 },
  { month: "May", revenue: 168000, collected: 145000 },
  { month: "Jun", revenue: 155000, collected: 132000 },
  { month: "Jul", revenue: 189000, collected: 162000 },
  { month: "Aug", revenue: 195000, collected: 168000 },
  { month: "Sep", revenue: 186000, collected: 155000 },
];

export const mockRecentActivities: RecentActivity[] = [
  { id: "act-001", type: "case", title: "New Case Filed", description: "Drake — International Tax Advisory (LC-2026-020) has been opened.", timestamp: "2026-09-08T10:30:00Z", user: "Alexander Grant" },
  { id: "act-002", type: "hearing", title: "Hearing Scheduled", description: "TRO Extension Hearing for Northstar trade secret case scheduled for Sep 15.", timestamp: "2026-09-08T09:15:00Z", user: "Sophia Castillo" },
  { id: "act-003", type: "document", title: "Document Uploaded", description: "Expert forensic report uploaded to Northstar trade secret case.", timestamp: "2026-09-07T16:45:00Z", user: "Sophia Castillo" },
  { id: "act-004", type: "payment", title: "Payment Received", description: "$50,000 payment received for Northstar patent infringement case.", timestamp: "2026-09-07T14:00:00Z", user: "System" },
  { id: "act-005", type: "task", title: "Task Completed", description: "Non-compete analysis for Kessler case marked as completed.", timestamp: "2026-09-07T11:30:00Z", user: "Nathan Cross" },
  { id: "act-006", type: "client", title: "New Client Inquiry", description: "Cascade Ventures LLC — prospective client consultation completed.", timestamp: "2026-09-06T15:00:00Z", user: "Eleanor Voss" },
  { id: "act-007", type: "document", title: "Document Updated", description: "SEC filing review document updated for Pinnacle Financial case.", timestamp: "2026-09-06T11:00:00Z", user: "Richard Thorpe" },
  { id: "act-008", type: "case", title: "Case Status Updated", description: "Meridian Healthcare investigation status changed to Under Review.", timestamp: "2026-09-05T09:30:00Z", user: "Amara Sterling" },
  { id: "act-009", type: "hearing", title: "Hearing Completed", description: "Preliminary injunction hearing for Northstar trade secret — injunction granted.", timestamp: "2026-08-15T17:00:00Z", user: "Sophia Castillo" },
  { id: "act-010", type: "payment", title: "Payment Received", description: "$48,000 full payment received for Harrington merger advisory.", timestamp: "2026-08-10T09:00:00Z", user: "System" },
];

export const mockLawyerPerformance = [
  { name: "Eleanor Voss", activeCases: 8, winRate: 94, revenue: 275000 },
  { name: "Marcus Hale", activeCases: 6, winRate: 91, revenue: 197000 },
  { name: "Amara Sterling", activeCases: 5, winRate: 89, revenue: 253000 },
  { name: "Julian Mercer", activeCases: 7, winRate: 92, revenue: 218000 },
  { name: "Sophia Castillo", activeCases: 4, winRate: 88, revenue: 282000 },
  { name: "Richard Thorpe", activeCases: 5, winRate: 96, revenue: 230000 },
  { name: "Diana Prescott", activeCases: 4, winRate: 90, revenue: 163000 },
  { name: "Nathan Cross", activeCases: 3, winRate: 86, revenue: 128000 },
];
