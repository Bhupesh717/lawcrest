import { NextRequest } from "next/server";
import { mockCases } from "@/lib/mock-data/cases";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockCases.find((c) => c.id === id);
  if (!found) return notFoundResponse("Case");
  return successResponse(found);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockCases.find((c) => c.id === id);
  if (!found) return notFoundResponse("Case");
  const body = await request.json();
  const updated = { ...found, ...body, updatedAt: new Date().toISOString() };
  return successResponse(updated, "Case updated successfully");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockCases.find((c) => c.id === id);
  if (!found) return notFoundResponse("Case");
  return successResponse(null, "Case deleted successfully");
}
