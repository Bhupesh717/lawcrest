import { mockUsers } from "@/lib/mock-data/users";
import { successResponse } from "@/lib/api/route-helpers";

export async function GET() {
  // In production, this would validate the auth token
  return successResponse(mockUsers[0]);
}
