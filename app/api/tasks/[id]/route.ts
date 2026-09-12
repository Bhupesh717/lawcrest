import { NextRequest } from "next/server";
import { mockTasks } from "@/lib/mock-data/tasks";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockTasks.find((t) => t.id === id);
  if (!found) return notFoundResponse("Task");
  return successResponse(found);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockTasks.find((t) => t.id === id);
  if (!found) return notFoundResponse("Task");
  const body = await request.json();
  return successResponse({ ...found, ...body, updatedAt: new Date().toISOString() }, "Task updated successfully");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockTasks.find((t) => t.id === id);
  if (!found) return notFoundResponse("Task");
  return successResponse(null, "Task deleted successfully");
}
