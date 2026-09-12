import { NextRequest } from "next/server";
import { mockCaseStudies } from "@/lib/mock-data/case-studies";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockCaseStudies.find((cs) => cs.id === id || cs.slug === id);
  if (!found) return notFoundResponse("Case Study");
  return successResponse(found);
}
