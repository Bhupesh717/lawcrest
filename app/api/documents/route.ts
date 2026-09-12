import { NextRequest } from "next/server";
import { mockDocuments } from "@/lib/mock-data/documents";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const category = searchParams.get("category");
  const caseId = searchParams.get("caseId");
  const fileType = searchParams.get("fileType");

  let filtered = [...mockDocuments];
  if (category) filtered = filtered.filter((d) => d.category === category);
  if (caseId) filtered = filtered.filter((d) => d.caseId === caseId);
  if (fileType) filtered = filtered.filter((d) => d.fileType === fileType);
  filtered = filterBySearch(filtered, search, ["title", "fileName", "caseName", "clientName"]);
  filtered = sortItems(filtered, sortBy || "uploadedAt", sortOrder);

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newDoc = { ...body, id: `doc-${Date.now()}`, uploadedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return successResponse(newDoc, "Document uploaded successfully");
}
