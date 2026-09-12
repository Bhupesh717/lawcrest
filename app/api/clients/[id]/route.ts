import { NextRequest } from "next/server";
import { mockClients } from "@/lib/mock-data/clients";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockClients.find((c) => c.id === id);
  if (!found) return notFoundResponse("Client");
  return successResponse(found);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockClients.find((c) => c.id === id);
  if (!found) return notFoundResponse("Client");
  const body = await request.json();
  return successResponse({ ...found, ...body, updatedAt: new Date().toISOString() }, "Client updated successfully");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockClients.find((c) => c.id === id);
  if (!found) return notFoundResponse("Client");
  return successResponse(null, "Client deleted successfully");
}
