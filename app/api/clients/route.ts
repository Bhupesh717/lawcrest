import { NextRequest } from "next/server";
import { mockClients } from "@/lib/mock-data/clients";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const status = searchParams.get("status");
  const clientType = searchParams.get("clientType");

  let filtered = [...mockClients];
  if (status) filtered = filtered.filter((c) => c.status === status);
  if (clientType) filtered = filtered.filter((c) => c.clientType === clientType);
  filtered = filterBySearch(filtered, search, ["name", "email", "company"]);
  filtered = sortItems(filtered, sortBy || "createdAt", sortOrder);

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newClient = { ...body, id: `cli-${Date.now()}`, caseIds: [], totalCases: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return successResponse(newClient, "Client created successfully");
}
