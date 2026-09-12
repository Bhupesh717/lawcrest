import { NextRequest } from "next/server";
import { mockDocuments } from "@/lib/mock-data/documents";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockDocuments.find((d) => d.id === id);
  if (!found) return notFoundResponse("Document");
  return successResponse(found);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockDocuments.find((d) => d.id === id);
  if (!found) return notFoundResponse("Document");
  return successResponse(null, "Document deleted successfully");
}
