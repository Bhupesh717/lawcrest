import { NextRequest } from "next/server";
import { mockCases } from "@/lib/mock-data/cases";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const caseType = searchParams.get("caseType");

  let filtered = [...mockCases];

  if (status) filtered = filtered.filter((c) => c.status === status);
  if (priority) filtered = filtered.filter((c) => c.priority === priority);
  if (caseType) filtered = filtered.filter((c) => c.caseType === caseType);

  filtered = filterBySearch(filtered, search, ["title", "caseNumber", "clientName", "lawyerName"]);
  filtered = sortItems(filtered, sortBy || "createdAt", sortOrder);

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newCase = {
    ...body,
    id: `case-${Date.now()}`,
    caseNumber: `LC-2026-${String(mockCases.length + 1).padStart(3, "0")}`,
    timeline: [],
    notes: [],
    documentIds: [],
    totalBilled: 0,
    totalPaid: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return successResponse(newCase, "Case created successfully");
}
