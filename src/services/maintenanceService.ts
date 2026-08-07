import { api, apiRoutes } from "../api/api";

export type MaintenanceKpi = {
  title: string;
  value: string;
  subtitle: string;
  icon: "hardHat" | "alert" | "toolCase" | "clock3";
  tone: "amber" | "red" | "emerald" | "cyan";
};

export type MaintenanceTask = {
  machine: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  assignedTo: string;
  status: "Open" | "In Progress" | "Resolved";
};

export type MaintenanceOverview = {
  kpis: MaintenanceKpi[];
  downtimeTrend: Array<{ day: string; minutes: number }>;
  tasks: MaintenanceTask[];
};

export const getMaintenanceOverview = async (): Promise<MaintenanceOverview> => {
  const response = await api.get<MaintenanceOverview>(apiRoutes.maintenance);
  return response.data;
};
