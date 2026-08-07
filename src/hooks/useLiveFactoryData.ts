import { useEffect, useState } from "react";
type LiveKpi = {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  iconName: "factory" | "zap" | "boxes" | "gauge" | "timer" | "alert" | "package" | "wrench";
  tone: "cyan" | "emerald" | "violet" | "amber" | "rose";
};

type LiveAlert = {
  id: number;
  message: string;
  time: string;
  severity: "High" | "Medium" | "Low";
};

type LiveMachine = {
  id: string;
  name: string;
  temperature: string;
  runtime: string;
  utilization: string;
  status: "Running" | "Maintenance" | "Idle";
};

type LiveFactoryState = {
  kpis: LiveKpi[];
  productionData: Array<{ day: string; production: number }>;
  machineUtilizationData: Array<{ machine: string; utilization: number }>;
  inventoryDistributionData: Array<{ name: string; value: number; color: string }>;
  alerts: LiveAlert[];
  machineStatuses: LiveMachine[];
};

const createInitialState = (): LiveFactoryState => ({
  kpis: [
    { title: "Production Today", value: "12,450", subtitle: "cases packed", trend: "+6.2% vs yesterday", iconName: "factory", tone: "cyan" },
    { title: "Machines Running", value: "24/26", subtitle: "assets online", trend: "92% availability", iconName: "zap", tone: "emerald" },
    { title: "Inventory Health", value: "92%", subtitle: "shelf-ready stock", trend: "+3% this week", iconName: "boxes", tone: "violet" },
    { title: "Efficiency", value: "96.4%", subtitle: "overall OEE", trend: "Above target", iconName: "gauge", tone: "amber" },
    { title: "Downtime Today", value: "18 min", subtitle: "across 3 lines", trend: "-11 min vs avg", iconName: "timer", tone: "rose" },
    { title: "Open Alerts", value: "3", subtitle: "priority issues", trend: "2 resolved today", iconName: "alert", tone: "amber" },
    { title: "Completed Orders", value: "184", subtitle: "dispatch ready", trend: "+14% this week", iconName: "package", tone: "emerald" },
    { title: "Active Work Orders", value: "12", subtitle: "in progress", trend: "6 planned today", iconName: "wrench", tone: "cyan" },
  ],
  productionData: [
    { day: "Mon", production: 11200 },
    { day: "Tue", production: 11850 },
    { day: "Wed", production: 12340 },
    { day: "Thu", production: 12180 },
    { day: "Fri", production: 12890 },
    { day: "Sat", production: 13420 },
    { day: "Sun", production: 12970 },
  ],
  machineUtilizationData: [
    { machine: "Bottle Line A1", utilization: 94 },
    { machine: "Can Line C2", utilization: 88 },
    { machine: "Packer P3", utilization: 91 },
    { machine: "Labeler L4", utilization: 83 },
    { machine: "Mixer M5", utilization: 97 },
    { machine: "Conveyor B6", utilization: 86 },
  ],
  inventoryDistributionData: [
    { name: "Raw Materials", value: 45, color: "#f43f5e" },
    { name: "Packaging", value: 25, color: "#fb923c" },
    { name: "Syrup", value: 15, color: "#22c55e" },
    { name: "Finished Goods", value: 15, color: "#38bdf8" },
  ],
  alerts: [
    { id: 1, message: "Machine M-204 temperature exceeded threshold", time: "5 min ago", severity: "High" },
    { id: 2, message: "Conveyor Belt 3 downtime detected", time: "12 min ago", severity: "High" },
    { id: 3, message: "Inventory of Sugar below reorder level", time: "27 min ago", severity: "Medium" },
    { id: 4, message: "Production Line B efficiency dropped to 82%", time: "41 min ago", severity: "Medium" },
    { id: 5, message: "Packaging Unit maintenance due", time: "1 hr ago", severity: "Low" },
  ],
  machineStatuses: [
    { id: "M-101", name: "Bottle Line A1", temperature: "72°C", runtime: "14h 20m", utilization: "94%", status: "Running" },
    { id: "M-204", name: "Cooling Unit C2", temperature: "88°C", runtime: "9h 10m", utilization: "81%", status: "Maintenance" },
    { id: "M-305", name: "Packer P3", temperature: "68°C", runtime: "12h 05m", utilization: "91%", status: "Running" },
    { id: "M-412", name: "Labeler L4", temperature: "65°C", runtime: "3h 40m", utilization: "76%", status: "Idle" },
    { id: "M-507", name: "Mixer M5", temperature: "70°C", runtime: "15h 00m", utilization: "97%", status: "Running" },
  ],
});

const formatRelativeTime = (minutes: number) => {
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 120) return "1 hr ago";
  return `${Math.floor(minutes / 60)} hrs ago`;
};

export default function useLiveFactoryData() {
  const [state, setState] = useState<LiveFactoryState>(createInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const intervalId = window.setInterval(() => {
      setState((previous) => {
        const nextKpis = previous.kpis.map((card, index) => {
          const delta = index === 0 ? 120 : index === 1 ? 1 : index === 2 ? 1 : index === 3 ? 0.1 : index === 4 ? 1 : index === 5 ? 1 : index === 6 ? 2 : 1;
          const direction = Math.random() > 0.5 ? 1 : -1;

          if (card.title === "Production Today") {
            const value = Number(card.value.replace(/,/g, "")) + direction * 120;
            return { ...card, value: value.toLocaleString(), trend: direction > 0 ? "+6.4% vs yesterday" : "+5.8% vs yesterday" };
          }

          if (card.title === "Machines Running") {
            const numbers = card.value.split("/").map((part) => Number(part));
            const nextRunning = Math.min(26, Math.max(0, numbers[0] + direction));
            return { ...card, value: `${nextRunning}/26`, trend: `${Math.round((nextRunning / 26) * 100)}% availability` };
          }

          if (card.title === "Efficiency") {
            const rawValue = Number(card.value.replace("%", ""));
            const nextValue = Math.max(90, Math.min(99.9, rawValue + direction * 0.1));
            return { ...card, value: `${nextValue.toFixed(1)}%`, trend: nextValue > 95.5 ? "Above target" : "Near threshold" };
          }

          if (card.title === "Downtime Today") {
            const current = Number(card.value.replace(" min", ""));
            const nextValue = Math.max(0, current + direction * 2);
            return { ...card, value: `${nextValue} min`, trend: nextValue < 15 ? "Below average" : "Rising trend" };
          }

          if (card.title === "Open Alerts") {
            const current = Number(card.value);
            return { ...card, value: `${Math.max(1, current + direction)}` };
          }

          if (card.title === "Active Work Orders") {
            const current = Number(card.value);
            return { ...card, value: `${Math.max(8, current + direction)}` };
          }

          return { ...card, value: `${Number(card.value.replace(/[^0-9.-]/g, "")) + direction * delta}` };
        });

        const productionData = previous.productionData.map((point, index) => {
          const base = point.production;
          const delta = index % 2 === 0 ? 180 : -140;
          return { ...point, production: Math.max(9000, base + delta + Math.round(Math.random() * 80)) };
        });

        const machineUtilizationData = previous.machineUtilizationData.map((entry, index) => {
          const nextValue = Math.min(100, Math.max(70, entry.utilization + (index % 2 === 0 ? 2 : -3)));
          return { ...entry, utilization: nextValue };
        });

        const inventoryDistributionData = previous.inventoryDistributionData.map((entry) => {
          if (entry.name === "Raw Materials") {
            return { ...entry, value: Math.max(20, Math.min(55, entry.value + (Math.random() > 0.5 ? 1 : -1))) };
          }
          if (entry.name === "Packaging") {
            return { ...entry, value: Math.max(20, Math.min(35, entry.value + (Math.random() > 0.5 ? 1 : -1))) };
          }
          if (entry.name === "Syrup") {
            return { ...entry, value: Math.max(10, Math.min(25, entry.value + (Math.random() > 0.5 ? 1 : -1))) };
          }
          return { ...entry, value: Math.max(10, Math.min(25, entry.value + (Math.random() > 0.5 ? 1 : -1))) };
        });

        const shouldAddAlert = Math.random() > 0.65;
        const nextAlerts = shouldAddAlert
          ? [{ id: Date.now(), message: "Line sensor variance detected near packaging bay", time: formatRelativeTime(2), severity: "High" as const }, ...previous.alerts].slice(0, 6)
          : previous.alerts;

        const machineStatuses = previous.machineStatuses.map((machine, index) => {
          const shouldFlip = Math.random() > 0.8;
          const statuses: Array<LiveMachine["status"]> = ["Running", "Maintenance", "Idle"];
          const nextStatus = shouldFlip ? statuses[(statuses.indexOf(machine.status) + 1) % statuses.length] : machine.status;
          const tempValue = Number(machine.temperature.replace("°C", ""));
          const nextTemperature = `${Math.max(60, Math.min(95, tempValue + (nextStatus === "Maintenance" ? 2 : -1)))}°C`;
          const runtimeValue = Number(machine.runtime.replace(/[^0-9]/g, ""));
          const nextRuntime = `${Math.max(1, runtimeValue + 1)}h`;
          return {
            ...machine,
            status: nextStatus,
            temperature: nextTemperature,
            runtime: nextRuntime,
            utilization: `${Math.max(40, Math.min(99, Number(machine.utilization.replace("%", "")) + (index % 2 === 0 ? 1 : -2)))}%`,
          };
        });

        return {
          ...previous,
          kpis: nextKpis,
          productionData,
          machineUtilizationData,
          inventoryDistributionData,
          alerts: nextAlerts,
          machineStatuses,
        };
      });
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return { ...state, isLoading };
}
