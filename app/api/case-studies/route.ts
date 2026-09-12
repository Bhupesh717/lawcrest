import { NextRequest } from "next/server";
import { mockCaseStudies } from "@/lib/mock-data/case-studies";
import { parseSearchParams, filterBySearch, sortItems, paginatedResponse } from "@/lib/api/route-helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { page, limit, search, sortBy, sortOrder } = parseSearchParams(searchParams);
  const category = searchParams.get("category");

  let filtered = [...mockCaseStudies];
  if (category) filtered = filtered.filter((cs) => cs.category === category);
  filtered = filterBySearch(filtered, search, ["title", "shortDescription", "clientIndustry"]);
  filtered = sortItems(filtered, sortBy || "publishedAt", sortOrder);

  return paginatedResponse(filtered, page, limit);
}
