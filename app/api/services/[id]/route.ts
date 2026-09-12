import { NextRequest } from "next/server";
import { mockServices } from "@/lib/mock-data/services";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockServices.find((s) => s.id === id || s.slug === id);
  if (!found) return notFoundResponse("Service");
  return successResponse(found);
}
