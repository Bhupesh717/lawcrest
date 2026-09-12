import { mockServices } from "@/lib/mock-data/services";
import { successResponse } from "@/lib/api/route-helpers";

export async function GET() {
  return successResponse(mockServices);
}
