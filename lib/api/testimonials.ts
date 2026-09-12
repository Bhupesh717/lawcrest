import { apiClient } from "./client";
import type { Testimonial } from "@/types";

export const testimonialsApi = {
  getTestimonials: () => apiClient.get<Testimonial[]>("/api/testimonials"),
};
