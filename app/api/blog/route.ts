import { NextRequest } from "next/server";
import { mockBlogs } from "@/lib/mock-data/blogs";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let filtered = [...mockBlogs];
  if (category) filtered = filtered.filter((b) => b.category === category);
  if (featured === "true") filtered = filtered.filter((b) => b.featured);
  filtered = filterBySearch(filtered, search, ["title", "excerpt", "author"]);
  filtered = sortItems(filtered, sortBy || "publishedAt", sortOrder);

  return paginatedResponse(filtered, page, limit);
}
