import { NextRequest } from "next/server";
import { mockHearings } from "@/lib/mock-data/hearings";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const status = searchParams.get("status");
  const caseId = searchParams.get("caseId");

  let filtered = [...mockHearings];
  if (status) filtered = filtered.filter((h) => h.status === status);
  if (caseId) filtered = filtered.filter((h) => h.caseId === caseId);
  filtered = filterBySearch(filtered, search, ["title", "caseName", "courtName", "lawyerName"]);
  filtered = sortItems(filtered, sortBy || "date", sortOrder === "asc" ? "asc" : "desc");

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newHearing = { ...body, id: `hr-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return successResponse(newHearing, "Hearing scheduled successfully");
}
