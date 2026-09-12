"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthlyTrend } from "@/types";

const defaultTrends: MonthlyTrend[] = [
  { month: "Jan", newCases: 4, resolvedCases: 3 },
  { month: "Feb", newCases: 6, resolvedCases: 5 },
  { month: "Mar", newCases: 8, resolvedCases: 6 },
  { month: "Apr", newCases: 5, resolvedCases: 7 },
  { month: "May", newCases: 9, resolvedCases: 8 },
  { month: "Jun", newCases: 7, resolvedCases: 6 },
];

export function MonthlyTrendsChart({
  data = defaultTrends,
}: {
  data?: MonthlyTrend[];
}) {
  return (
    <div className="rounded-xl border border-[#262018] bg-[#14110E] p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
            Caseload Velocity & Resolution
          </h3>
          <p className="text-xs text-[#8F897F]">New case filings vs resolved proceedings</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262018" vertical={false} />
            <XAxis dataKey="month" stroke="#6E675D" fontSize={11} />
            <YAxis stroke="#6E675D" fontSize={11} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#17130F",
                borderColor: "#C9A45C",
                borderRadius: "8px",
                color: "#F5F1E8",
                fontSize: "12px",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={30}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-[#B8B0A3]">
                  {value === "newCases" ? "New Matters" : "Resolved"}
                </span>
              )}
            />
            <Bar dataKey="newCases" fill="#C9A45C" radius={[4, 4, 0, 0]} name="newCases" />
            <Bar dataKey="resolvedCases" fill="#3B82F6" radius={[4, 4, 0, 0]} name="resolvedCases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
