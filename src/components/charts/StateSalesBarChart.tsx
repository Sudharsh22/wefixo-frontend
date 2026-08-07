import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { state: "Texas", sales: 0.42 },
  { state: "Washington", sales: 0.38 },
  { state: "Utah", sales: 0.26 },
  { state: "Virginia", sales: 0.25 },
  { state: "Tennessee", sales: 0.24 },
  { state: "Oregon", sales: 0.22 },
  { state: "Arizona", sales: 0.21 },
  { state: "Colorado", sales: 0.16 },
  { state: "North Carolina", sales: 0.12 },
  { state: "New York", sales: 0.11 },
];

type Props = {
  title?: string;
};

export default function StateSalesBarChart({ title = "Sum of Total Sales by State" }: Props) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-red-950/90 bg-[#060204] p-4 font-sans shadow-xl">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-300">
        {title}
      </h3>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
            <XAxis
              dataKey="state"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              stroke="#3a080d"
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              tickFormatter={(v) => `${v}M`}
              domain={[0, 0.5]}
              ticks={[0, 0.2, 0.4]}
              stroke="#3a080d"
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0e0204", borderColor: "#ff1e27", borderRadius: "8px" }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              formatter={(value: any) => [`$${value}M`, "Sales"]}
            />
            <Bar dataKey="sales" fill="#e60012" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] uppercase font-bold text-gray-400 mt-1">
        State
      </div>
    </div>
  );
}
