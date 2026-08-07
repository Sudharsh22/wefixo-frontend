import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { region: "Midwest", count: 1000 },
  { region: "Northeast", count: 850 },
  { region: "South", count: 700 },
  { region: "West", count: 520 },
  { region: "Southeast", count: 320 },
];

export default function RegionAreaChart() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-red-950/90 bg-[#060204] p-4 font-sans shadow-xl">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-300">
        Count of Retailer and Count of Beverage Brand by Region
      </h3>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="areaRedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff1e27" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b0000" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="region" tick={{ fill: "#9ca3af", fontSize: 10 }} stroke="#3a080d" />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              domain={[0, 1000]}
              ticks={[0, 500, 1000]}
              stroke="#3a080d"
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0e0204", borderColor: "#ff1e27", borderRadius: "8px" }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
            />
            <Area type="monotone" dataKey="count" stroke="#ff1e27" strokeWidth={3} fillOpacity={1} fill="url(#areaRedGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-[10px] uppercase font-bold text-gray-400 mt-1">
        Region
      </div>
    </div>
  );
}
