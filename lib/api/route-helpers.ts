// ──────────────────────────────────────────────
// Shared API Route Helpers
// ──────────────────────────────────────────────
// Reusable utilities for mock API routes to
// support pagination, search, filter, and sort.
// ──────────────────────────────────────────────

import { NextResponse } from "next/server";

export function successResponse<T>(data: T, message = "Request successful") {
  return NextResponse.json({ success: true, data, message });
}

export function paginatedResponse<T>(
  items: T[],
  page: number,
  limit: number,
  message = "Request successful"
) {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginatedItems,
    pagination: { page, limit, total, totalPages },
    message,
  });
}

export function errorResponse(message: string, status = 400, errors?: string[]) {
  return NextResponse.json({ success: false, message, errors }, { status });
}

export function notFoundResponse(entity = "Resource") {
  return NextResponse.json(
    { success: false, message: `${entity} not found` },
    { status: 404 }
  );
}

export function parseSearchParams(searchParams: URLSearchParams) {
  return {
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
  };
}

export function filterBySearch<T extends object>(
  items: T[],
  search: string,
  fields: (keyof T)[]
): T[] {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => String(item[field] || "").toLowerCase().includes(q))
  );
}

export function sortItems<T extends object>(
  items: T[],
  sortBy: string,
  sortOrder: "asc" | "desc"
): T[] {
  if (!sortBy) return items;
  return [...items].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortBy];
    const bVal = (b as Record<string, unknown>)[sortBy];
    if (aVal === bVal) return 0;
    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;
    const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
    return sortOrder === "asc" ? comparison : -comparison;
  });
}
