import { mockTestimonials } from "@/lib/mock-data/testimonials";
import { successResponse } from "@/lib/api/route-helpers";

export async function GET() {
  return successResponse(mockTestimonials);
}
