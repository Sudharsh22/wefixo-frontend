import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Texas", value: 144, percent: "18.1%", color: "#e60012" },
  { name: "South Dakota", value: 72, percent: "9.0%", color: "#b3000e" },
  { name: "Tennessee", value: 72, percent: "9.0%", color: "#80000a" },
  { name: "Utah", value: 72, percent: "9.0%", color: "#ff4d58" },
  { name: "Vermont", value: 72, percent: "9.0%", color: "#ff1e27" },
  { name: "Virginia", value: 72, percent: "9.0%", color: "#990000" },
  { name: "Washington", value: 72, percent: "9.0%", color: "#660000" },
  { name: "West Virginia", value: 72, percent: "9.0%", color: "#ff8088" },
];

export default function RetailerDonutChart() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-red-950/90 bg-[#060204] p-4 font-sans shadow-xl">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-300">
        Count of Retailer by State
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut Chart Canvas */}
        <div className="h-52 w-52 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#060204" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#0e0204", borderColor: "#ff1e27", borderRadius: "8px" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="space-y-1.5 text-xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">State</p>
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-300 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
