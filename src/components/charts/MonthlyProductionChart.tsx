import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { month: "Jan", cases: 1.82 },
  { month: "Feb", cases: 1.95 },
  { month: "Mar", cases: 2.10 },
  { month: "Apr", cases: 2.25 },
  { month: "May", cases: 2.40 },
  { month: "Jun", cases: 2.58 },
];

export default function MonthlyProductionChart() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-red-950/90 bg-[#060204] p-4 font-sans shadow-xl">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-300">
        Monthly Production Trend
      </h3>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <XAxis
              dataKey="month"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              stroke="#3a080d"
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              tickFormatter={(v) => `${v}M`}
              domain={[0, 3.0]}
              ticks={[0, 1.0, 2.0, 3.0]}
              stroke="#3a080d"
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0e0204", borderColor: "#ff1e27", borderRadius: "8px" }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              formatter={(value: any) => [`${value}M Cases`, "Volume"]}
            />
            <Bar dataKey="cases" fill="#ff1e27" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] uppercase font-bold text-gray-400 mt-1">
        Month (YTD)
      </div>
    </div>
  );
}
