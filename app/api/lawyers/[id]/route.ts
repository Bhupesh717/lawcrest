import { NextRequest } from "next/server";
import { mockLawyers } from "@/lib/mock-data/lawyers";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockLawyers.find((l) => l.id === id);
  if (!found) return notFoundResponse("Lawyer");
  return successResponse(found);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockLawyers.find((l) => l.id === id);
  if (!found) return notFoundResponse("Lawyer");
  const body = await request.json();
  return successResponse({ ...found, ...body, updatedAt: new Date().toISOString() }, "Lawyer updated successfully");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockLawyers.find((l) => l.id === id);
  if (!found) return notFoundResponse("Lawyer");
  return successResponse(null, "Lawyer removed successfully");
}
