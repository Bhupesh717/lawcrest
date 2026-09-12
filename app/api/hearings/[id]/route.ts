import { NextRequest } from "next/server";
import { mockHearings } from "@/lib/mock-data/hearings";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockHearings.find((h) => h.id === id);
  if (!found) return notFoundResponse("Hearing");
  return successResponse(found);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockHearings.find((h) => h.id === id);
  if (!found) return notFoundResponse("Hearing");
  const body = await request.json();
  return successResponse({ ...found, ...body, updatedAt: new Date().toISOString() }, "Hearing updated successfully");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockHearings.find((h) => h.id === id);
  if (!found) return notFoundResponse("Hearing");
  return successResponse(null, "Hearing deleted successfully");
}
