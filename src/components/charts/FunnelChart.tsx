import { useState } from "react";

type CityItem = {
  name: string;
  checked: boolean;
};

const brandData = [
  { name: "Bottling Line A1", value: "1.92M", percent: 100 },
  { name: "Canning Line C2", value: "1.64M", percent: 85 },
  { name: "Packer Unit P3", value: "1.39M", percent: 72 },
  { name: "Labeler Line L4", value: "1.16M", percent: 60 },
  { name: "Mixer Unit M5", value: "1.13M", percent: 58 },
  { name: "Conveyor Belt B6", value: "0.97M", percent: 50.4 },
];

const initialCities: CityItem[] = [
  { name: "Portland", checked: true },
  { name: "Providence", checked: true },
  { name: "Richmond", checked: true },
  { name: "Salt Lake City", checked: true },
  { name: "San Francisco", checked: true },
  { name: "Seattle", checked: true },
  { name: "Sioux Falls", checked: true },
];

export default function FunnelChart() {
  const [cities, setCities] = useState<CityItem[]>(initialCities);
  const [selectAll, setSelectAll] = useState(true);

  const toggleSelectAll = () => {
    const next = !selectAll;
    setSelectAll(next);
    setCities(cities.map((c: CityItem) => ({ ...c, checked: next })));
  };

  const toggleCity = (index: number) => {
    const updated = [...cities];
    updated[index].checked = !updated[index].checked;
    setCities(updated);
    setSelectAll(updated.every((c) => c.checked));
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 rounded-xl border border-red-950/90 bg-[#060204] p-4 font-sans shadow-xl">
      {/* Brand Horizontal Funnel Bars (Left 3 columns) */}
      <div className="lg:col-span-3 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Sum of Total Output by Production Line
          </h3>
          <span className="text-[10px] text-gray-400">100%</span>
        </div>

        <div className="space-y-2.5 my-auto">
          {brandData.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="w-24 text-right text-xs font-semibold text-gray-300 truncate">
                {item.name}
              </span>
              <div className="relative flex-1 bg-[#120305] h-6 rounded overflow-hidden border border-red-950/60">
                <div
                  className="h-full bg-gradient-to-r from-[#8b0000] to-[#ff1e27] transition-all duration-300 flex items-center justify-center text-[11px] font-bold text-white shadow-[0_0_8px_rgba(255,30,39,0.3)]"
                  style={{ width: `${item.percent}%` }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end text-[10px] font-bold text-gray-400 mt-2">
          <span>50.4%</span>
        </div>
      </div>

      {/* City Multi-Select Filter Checklist (Right 1 column) */}
      <div className="border-t lg:border-t-0 lg:border-l border-red-950/80 pt-4 lg:pt-0 lg:pl-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300">City</span>
          <span className="text-[10px] text-gray-400">▼</span>
        </div>

        <div className="space-y-1.5 overflow-y-auto max-h-48 text-xs">
          <label className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="accent-[#ff1e27] rounded"
            />
            <span className="font-semibold">Select all</span>
          </label>
          {cities.map((city, idx) => (
            <label key={city.name} className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer select-none pl-2">
              <input
                type="checkbox"
                checked={city.checked}
                onChange={() => toggleCity(idx)}
                className="accent-[#ff1e27] rounded"
              />
              <span>{city.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
