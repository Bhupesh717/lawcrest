import { apiClient } from "./client";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export const contactApi = {
  submitContact: (data: ContactFormData) => apiClient.post("/api/contact", data),
};
