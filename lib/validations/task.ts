import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description is required"),
  caseId: z.string().optional(),
  assignedTo: z.string().min(1, "Assignee is required"),
  status: z.enum(["todo", "in-progress", "review", "completed"]).default("todo"),
  priority: z.enum(["high", "medium", "low", "urgent"]).default("medium"),
  dueDate: z.string().min(1, "Due date is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
