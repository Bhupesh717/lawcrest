import { NextRequest } from "next/server";
import { mockInvoices } from "@/lib/mock-data/invoices";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse, successResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const status = searchParams.get("status");

  let filtered = [...mockInvoices];
  if (status) filtered = filtered.filter((i) => i.status === status);
  filtered = filterBySearch(filtered, search, ["invoiceNumber", "caseName", "clientName", "lawyerName"]);
  filtered = sortItems(filtered, sortBy || "issuedDate", sortOrder);

  return paginatedResponse(filtered, page, limit);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newInvoice = { ...body, id: `inv-${Date.now()}`, invoiceNumber: `INV-2026-${String(mockInvoices.length + 1).padStart(3, "0")}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  return successResponse(newInvoice, "Invoice created successfully");
}
