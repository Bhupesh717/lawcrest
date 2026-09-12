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

const defaultLawyerData = [
  { name: "A. Drake", activeCases: 9, winRate: 98 },
  { name: "E. Sterling", activeCases: 7, winRate: 96 },
  { name: "M. Vance", activeCases: 6, winRate: 94 },
  { name: "D. Ross", activeCases: 8, winRate: 92 },
  { name: "C. Thorne", activeCases: 5, winRate: 95 },
];

export function LawyerPerformanceChart({
  data = defaultLawyerData,
}: {
  data?: any[];
}) {
  return (
    <div className="rounded-xl border border-[#262018] bg-[#14110E] p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
            Partner Litigation Caseloads
          </h3>
          <p className="text-xs text-[#8F897F]">Active trials and arbitration proceedings</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262018" horizontal={false} />
            <XAxis type="number" stroke="#6E675D" fontSize={11} allowDecimals={false} />
            <YAxis type="category" dataKey="name" stroke="#6E675D" fontSize={11} width={75} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#17130F",
                borderColor: "#C9A45C",
                borderRadius: "8px",
                color: "#F5F1E8",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val} active matters`, "Caseload"]}
            />
            <Bar dataKey="activeCases" fill="#C9A45C" radius={[0, 4, 4, 0]} name="Active Cases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
