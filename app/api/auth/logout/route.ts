import { successResponse } from "@/lib/api/route-helpers";

export async function POST() {
  return successResponse(null, "Logged out successfully");
}
