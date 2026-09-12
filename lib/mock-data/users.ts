import type { User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Alex Morgan",
    email: "admin@lawcrest.com",
    role: "admin",
    image: "/images/users/alex-morgan.jpg",
    designation: "Managing Partner",
    phone: "+1 212-555-0100",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-002",
    name: "Eleanor Voss",
    email: "eleanor.voss@lawcrest.com",
    role: "lawyer",
    image: "/images/lawyers/eleanor-voss.jpg",
    designation: "Managing Partner",
    phone: "+1 212-555-0101",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-003",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@lawcrest.com",
    role: "staff",
    image: "/images/users/sarah-jenkins.jpg",
    designation: "Legal Secretary",
    phone: "+1 212-555-0120",
    createdAt: "2024-06-15T00:00:00Z",
  },
];

export const MOCK_CREDENTIALS = {
  email: "admin@lawcrest.com",
  password: "Admin@123",
};
