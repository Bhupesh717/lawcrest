"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface MonthlyRevenuePoint {
  month: string;
  billed: number;
  collected: number;
}

const defaultRevenueData: MonthlyRevenuePoint[] = [
  { month: "Jan", billed: 320000, collected: 290000 },
  { month: "Feb", billed: 380000, collected: 340000 },
  { month: "Mar", billed: 450000, collected: 410000 },
  { month: "Apr", billed: 420000, collected: 390000 },
  { month: "May", billed: 510000, collected: 480000 },
  { month: "Jun", billed: 640000, collected: 590000 },
];

export function RevenueChart({
  data = defaultRevenueData,
}: {
  data?: MonthlyRevenuePoint[];
}) {
  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

  return (
    <div className="rounded-xl border border-[#262018] bg-[#14110E] p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#F5F1E8]">
            Revenue Collections & Billed Hours
          </h3>
          <p className="text-xs text-[#8F897F]">Monthly realization rate across all retainers</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A45C" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#C9A45C" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262018" vertical={false} />
            <XAxis dataKey="month" stroke="#6E675D" fontSize={11} />
            <YAxis stroke="#6E675D" fontSize={11} tickFormatter={formatCurrency} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#17130F",
                borderColor: "#C9A45C",
                borderRadius: "8px",
                color: "#F5F1E8",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`$${Number(val).toLocaleString()}`, ""]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={30}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-[#B8B0A3] capitalize">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="billed"
              stroke="#C9A45C"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBilled)"
              name="Billed"
            />
            <Area
              type="monotone"
              dataKey="collected"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCollected)"
              name="Collected"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
