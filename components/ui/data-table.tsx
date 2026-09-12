"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { TableSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (key: string, order: "asc" | "desc") => void;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search records...",
  filters,
  actions,
  page = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  sortBy,
  sortOrder,
  onSortChange,
  emptyTitle = "No records found",
  emptyDescription = "There are no entries matching your current filters or search terms.",
  onRowClick,
  className,
}: DataTableProps<T>) {
  const handleSort = (columnKey: string) => {
    if (!onSortChange) return;
    if (sortBy === columnKey) {
      onSortChange(columnKey, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(columnKey, "asc");
    }
  };

  const startRecord = totalItems > 0 ? (page - 1) * pageSize + 1 : 0;
  const endRecord = Math.min(page * pageSize, totalItems);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Top Controls Bar */}
      {(onSearchChange || filters || actions) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-2.5 flex-wrap">
            {onSearchChange && (
              <SearchInput
                value={searchTerm || ""}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
              />
            )}
            {filters}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-xl border border-[#262018] bg-[#14110E] overflow-hidden shadow-xl">
        {isLoading ? (
          <TableSkeleton rows={pageSize || 5} columns={columns.length} />
        ) : data.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#262018] bg-[#191511]/80 text-xs font-semibold uppercase tracking-wider text-[#8F897F]">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn("px-4 py-3.5", col.className)}
                    >
                      {col.sortable && onSortChange ? (
                        <button
                          type="button"
                          onClick={() => handleSort(col.key)}
                          className="flex items-center gap-1.5 hover:text-[#C9A45C] transition-colors focus:outline-none"
                        >
                          <span>{col.header}</span>
                          {sortBy === col.key ? (
                            sortOrder === "asc" ? (
                              <ArrowUp className="h-3.5 w-3.5 text-[#C9A45C]" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5 text-[#C9A45C]" />
                            )
                          ) : (
                            <ArrowUpDown className="h-3 w-3 opacity-40" />
                          )}
                        </button>
                      ) : (
                        col.header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#221C16]">
                {data.map((item) => (
                  <tr
                    key={keyExtractor(item)}
                    onClick={() => onRowClick?.(item)}
                    className={cn(
                      "hover:bg-[#1A1612] transition-colors",
                      onRowClick && "cursor-pointer"
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("px-4 py-3.5 text-[#E6E0D5]", col.className)}
                      >
                        {col.render
                          ? col.render(item)
                          : ((item as Record<string, unknown>)[col.key] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalItems > 0 && onPageChange && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-[#262018] bg-[#17130F] text-xs text-[#8F897F]">
            <div>
              Showing <span className="text-[#F5F1E8] font-medium">{startRecord}</span> to{" "}
              <span className="text-[#F5F1E8] font-medium">{endRecord}</span> of{" "}
              <span className="text-[#F5F1E8] font-medium">{totalItems}</span> results
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1 || isLoading}
                className="h-8 w-8 p-0 border-[#262018] bg-[#14110E] hover:bg-[#201A15] text-[#E6E0D5]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <span className="px-2 font-medium text-[#E6E0D5]">
                Page {page} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages || isLoading}
                className="h-8 w-8 p-0 border-[#262018] bg-[#14110E] hover:bg-[#201A15] text-[#E6E0D5]"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
