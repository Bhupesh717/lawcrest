import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/route-helpers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return errorResponse("Name, email, and message are required", 400);
  }

  // In production, this would send an email or save to database
  return successResponse(
    { id: `contact-${Date.now()}`, ...body, submittedAt: new Date().toISOString() },
    "Your message has been received. We will contact you shortly."
  );
}
