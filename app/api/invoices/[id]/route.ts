import { NextRequest } from "next/server";
import { mockInvoices } from "@/lib/mock-data/invoices";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockInvoices.find((i) => i.id === id);
  if (!found) return notFoundResponse("Invoice");
  return successResponse(found);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockInvoices.find((i) => i.id === id);
  if (!found) return notFoundResponse("Invoice");
  const body = await request.json();
  return successResponse({ ...found, ...body, updatedAt: new Date().toISOString() }, "Invoice updated successfully");
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockInvoices.find((i) => i.id === id);
  if (!found) return notFoundResponse("Invoice");
  return successResponse(null, "Invoice deleted successfully");
}
