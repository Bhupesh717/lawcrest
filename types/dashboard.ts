// ──────────────────────────────────────────────
// Dashboard Types
// ──────────────────────────────────────────────

export interface DashboardStats {
  totalCases: number;
  activeCases: number;
  pendingCases: number;
  closedCases: number;
  upcomingHearings: number;
  totalClients: number;
  activeClients: number;
  totalLawyers: number;
  outstandingInvoices: number;
  totalRevenue: number;
  monthlyRevenue: number;
  pendingTasks: number;
  caseGrowthPercent: number;
  revenueGrowthPercent: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

export interface CaseStatusDistribution {
  status: string;
  count: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  opened: number;
  closed: number;
}

export interface RecentActivity {
  id: string;
  type: "case" | "document" | "hearing" | "payment" | "task" | "client";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}
