import { NextRequest } from "next/server";
import { mockUsers, MOCK_CREDENTIALS } from "@/lib/mock-data/users";
import { successResponse, errorResponse } from "@/lib/api/route-helpers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    const user = mockUsers[0];
    return successResponse({
      user,
      token: "mock-jwt-token-" + Date.now(),
    }, "Login successful");
  }

  return errorResponse("Invalid email or password", 401);
}
