// ──────────────────────────────────────────────
// Task Types
// ──────────────────────────────────────────────

export type TaskStatus = "todo" | "in-progress" | "review" | "completed";

export type TaskPriority = "high" | "medium" | "low" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  caseId?: string;
  caseName?: string;
  assignedTo: string;
  assignedToName: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  completedAt?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
