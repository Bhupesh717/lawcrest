import { NextRequest } from "next/server";
import { mockLawyers } from "@/lib/mock-data/lawyers";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const specialization = searchParams.get("specialization");
  const status = searchParams.get("status");

  let filtered = [...mockLawyers];
  if (status) filtered = filtered.filter((l) => l.status === status);
  if (specialization) filtered = filtered.filter((l) => l.specializations.includes(specialization as any));
  filtered = filterBySearch(filtered, search, ["name", "email", "designation"]);
  filtered = sortItems(filtered, sortBy || "name", sortOrder);

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newLawyer = { ...body, id: `law-${Date.now()}`, activeCases: 0, totalCases: 0, winRate: 0, caseIds: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return successResponse(newLawyer, "Lawyer added successfully");
}
