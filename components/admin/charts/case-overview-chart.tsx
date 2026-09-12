"use client";

import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { CaseStatusDistribution } from "@/types";

const COLORS = ["#C9A45C", "#3B82F6", "#F59E0B", "#10B981", "#6B7280"];

export function CaseOverviewChart({
  data,
}: {
  data?: CaseStatusDistribution[];
}) {
  const chartData = data && data.length > 0 ? data : [
    { status: "Open / Active", count: 12 },
    { status: "In Progress", count: 8 },
    { status: "Hearing Pending", count: 4 },
    { status: "Resolved", count: 18 },
    { status: "Closed", count: 6 },
  ];

  return (
    <div className="rounded-xl border border-[#262018] bg-[#14110E] p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
            Case Status Distribution
          </h3>
          <p className="text-xs text-[#8F897F]">Active portfolio breakdown by phase</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
              nameKey="status"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#14110E"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#17130F",
                borderColor: "#C9A45C",
                borderRadius: "8px",
                color: "#F5F1E8",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val} cases`, "Count"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-[#B8B0A3]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
