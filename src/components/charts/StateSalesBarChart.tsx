import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { state: "Tamil Nadu", output: 0.42 },
  { state: "Karnataka", output: 0.38 },
  { state: "Maharashtra", output: 0.35 },
  { state: "Gujarat", output: 0.31 },
  { state: "Telangana", output: 0.28 },
  { state: "Andhra Pr.", output: 0.25 },
  { state: "Kerala", output: 0.22 },
  { state: "Uttar Pr.", output: 0.19 },
  { state: "Delhi", output: 0.15 },
  { state: "West Bengal", output: 0.12 },
];

type Props = {
  title?: string;
};

export default function StateSalesBarChart({ title = "Production Output by State" }: Props) {
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
              formatter={(value: any) => [`${value}M Cases`, "Output"]}
            />
            <Bar dataKey="output" fill="#e60012" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] uppercase font-bold text-gray-400 mt-1">
        Indian State
      </div>
    </div>
  );
}
