import { NextRequest } from "next/server";
import { mockTasks } from "@/lib/mock-data/tasks";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const assignedTo = searchParams.get("assignedTo");

  let filtered = [...mockTasks];
  if (status) filtered = filtered.filter((t) => t.status === status);
  if (priority) filtered = filtered.filter((t) => t.priority === priority);
  if (assignedTo) filtered = filtered.filter((t) => t.assignedTo === assignedTo);
  filtered = filterBySearch(filtered, search, ["title", "description", "caseName", "assignedToName"]);
  filtered = sortItems(filtered, sortBy || "dueDate", sortOrder === "asc" ? "asc" : "desc");

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newTask = { ...body, id: `task-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return successResponse(newTask, "Task created successfully");
}
