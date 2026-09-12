import { useQuery } from "@tanstack/react-query";
import { testimonialsApi } from "@/lib/api/testimonials";

export function useTestimonials() {
  return useQuery({ queryKey: ["testimonials"], queryFn: () => testimonialsApi.getTestimonials() });
}
