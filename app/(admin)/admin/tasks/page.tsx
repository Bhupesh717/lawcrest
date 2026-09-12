"use client";

import * as React from "react";
import {
  CheckSquare,
  Plus,
  LayoutGrid,
  List,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { Select } from "@/components/ui/select";
import { useTasks, useUpdateTask } from "@/lib/hooks/use-tasks";
import type { Task } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const KANBAN_COLUMNS = [
  { key: "TODO", label: "To Do / Draft", color: "border-[#262018]" },
  { key: "IN_PROGRESS", label: "In Progress", color: "border-amber-500/30" },
  { key: "UNDER_REVIEW", label: "Partner Review", color: "border-sky-500/30" },
  { key: "COMPLETED", label: "Completed", color: "border-emerald-500/30" },
];

export default function TasksPage() {
  const [viewMode, setViewMode] = React.useState<"kanban" | "list">("kanban");
  const [priorityFilter, setPriorityFilter] = React.useState("");

  const { data, isLoading, refetch } = useTasks({
    priority: priorityFilter || undefined,
    limit: 50,
  });

  const updateMutation = useUpdateTask();

  const tasks = data?.data || [];

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateMutation.mutateAsync({
        id: taskId,
        data: { status: newStatus as any },
      });
      toast.success("Task Updated", {
        description: `Task status updated to ${newStatus.replace(/_/g, " ")}.`,
      });
      refetch();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleCreateMock = () => {
    toast.info("Create Task Docket", {
      description: "Enter litigation task details, due date, and assign associate.",
    });
  };

  const columns: Column<Task>[] = [
    {
      key: "title",
      header: "Task & Docket Assignment",
      sortable: true,
      className: "min-w-[240px]",
      render: (t) => (
        <div>
          <span className="font-serif text-sm font-semibold text-[#F5F1E8] block line-clamp-1">
            {t.title}
          </span>
          <span className="text-[11px] text-[#8F897F] block line-clamp-1">
            {t.description || "Associated legal docket task"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (t) => <StatusBadge status={t.status} size="sm" />,
    },
    {
      key: "priority",
      header: "Urgency",
      sortable: true,
      render: (t) => <PriorityBadge priority={t.priority} size="sm" />,
    },
    {
      key: "dueDate",
      header: "Due Deadline",
      render: (t) => (
        <span className="text-xs text-[#C9A45C] font-mono flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "This Week"}
        </span>
      ),
    },
    {
      key: "assignedTo",
      header: "Assigned Staff",
      render: (t) => (
        <span className="text-xs text-[#E6E0D5]">
          {t.assignedTo?.name || "Senior Associate"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Litigation Tasks & Docketing"
        description="Monitor statutory filing deadlines, draft discovery requests, and brief drafting workflows."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Tasks" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="flex items-center rounded-lg border border-[#262018] bg-[#14110E] p-0.5">
              <Button
                variant={viewMode === "kanban" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("kanban")}
                className={cn(
                  "h-7 px-2.5 text-xs gap-1",
                  viewMode === "kanban"
                    ? "bg-[#C9A45C] text-[#0A0A0A] font-bold"
                    : "text-[#8F897F] hover:text-[#F5F1E8]"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Kanban</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(
                  "h-7 px-2.5 text-xs gap-1",
                  viewMode === "list"
                    ? "bg-[#C9A45C] text-[#0A0A0A] font-bold"
                    : "text-[#8F897F] hover:text-[#F5F1E8]"
                )}
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Table</span>
              </Button>
            </div>

            <Button
              onClick={handleCreateMock}
              className="bg-[#C9A45C] hover:bg-[#D8B76A] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider h-8 px-3 gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Task</span>
            </Button>
          </div>
        }
      />

      {/* Kanban Board View */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {KANBAN_COLUMNS.map((col) => {
            const colTasks = tasks.filter(
              (t) => t.status?.toUpperCase() === col.key
            );

            return (
              <div
                key={col.key}
                className="rounded-xl border border-[#262018] bg-[#120F0D] p-4 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#221C16]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />
                    <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#F5F1E8]">
                      {col.label}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1612] text-[#8F897F]">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 min-h-[400px]">
                  {colTasks.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-xs text-[#5A544B] border border-dashed border-[#221C16] rounded-lg">
                      No tasks in this lane
                    </div>
                  ) : (
                    colTasks.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-lg border border-[#262018] bg-[#17130F] p-3.5 space-y-2.5 shadow-md hover:border-[#C9A45C]/40 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <PriorityBadge priority={t.priority} size="sm" />
                          <span className="text-[10px] text-[#8F897F] font-mono">
                            {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "Due Friday"}
                          </span>
                        </div>

                        <h4 className="font-serif text-sm font-semibold text-[#F5F1E8] group-hover:text-[#D8B76A] transition-colors leading-snug">
                          {t.title}
                        </h4>

                        {t.description && (
                          <p className="text-[11px] text-[#8F897F] line-clamp-2 leading-relaxed">
                            {t.description}
                          </p>
                        )}

                        <div className="pt-2 border-t border-[#221C16] flex items-center justify-between text-[11px] text-[#8F897F]">
                          <span className="truncate max-w-[120px]">
                            {t.assignedTo?.name || "Associate Counsel"}
                          </span>

                          {/* Quick lane transition buttons */}
                          <div className="flex items-center gap-1">
                            {col.key !== "COMPLETED" ? (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    t.id,
                                    col.key === "TODO"
                                      ? "IN_PROGRESS"
                                      : col.key === "IN_PROGRESS"
                                      ? "UNDER_REVIEW"
                                      : "COMPLETED"
                                  )
                                }
                                className="text-[10px] text-[#C9A45C] hover:underline"
                              >
                                Advance →
                              </button>
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <DataTable
          data={tasks}
          columns={columns}
          keyExtractor={(t) => t.id}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
