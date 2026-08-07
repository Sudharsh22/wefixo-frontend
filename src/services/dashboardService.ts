import { api, apiRoutes } from "../api/api";

export type DashboardKpi = {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: "factory" | "zap" | "boxes" | "gauge" | "timer" | "alert" | "package" | "wrench";
  tone: "cyan" | "emerald" | "violet" | "amber" | "rose";
};

export type DashboardOverview = {
  kpis: DashboardKpi[];
  recentAlerts: Array<{
    id: string;
    title: string;
    severity: "critical" | "warning" | "info";
    detail: string;
    time: string;
  }>;
};

export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  const response = await api.get<DashboardOverview>(apiRoutes.dashboard.metrics);
  return response.data;
};
