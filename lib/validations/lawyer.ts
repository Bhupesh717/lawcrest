import { z } from "zod";

export const lawyerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  designation: z.string().min(2, "Designation is required"),
  specializations: z.array(z.string()).min(1, "At least one specialization is required"),
  barNumber: z.string().min(3, "Bar number is required"),
  experience: z.number().min(0, "Experience must be a positive number"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  education: z.array(z.string()).min(1, "At least one education entry is required"),
  status: z.enum(["active", "on-leave", "inactive"]).default("active"),
});

export type LawyerFormData = z.infer<typeof lawyerSchema>;
