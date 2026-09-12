import { NextRequest } from "next/server";
import { mockBlogs } from "@/lib/mock-data/blogs";
import { successResponse, notFoundResponse } from "@/lib/api/route-helpers";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = mockBlogs.find((b) => b.id === id || b.slug === id);
  if (!found) return notFoundResponse("Blog Post");
  return successResponse(found);
}
