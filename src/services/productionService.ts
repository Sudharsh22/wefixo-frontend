import { api, apiRoutes } from "../api/api";

export type ProductionKpi = {
  title: string;
  value: string;
  subtitle: string;
  icon: "factory" | "package" | "alert" | "gauge";
  tone: "red" | "emerald" | "amber" | "cyan";
};

export type WorkOrder = {
  id: string;
  product: string;
  plannedQty: number;
  producedQty: number;
  status: "In Progress" | "Ready" | "Delayed";
};

export type ProductionOverview = {
  kpis: ProductionKpi[];
  hourlyData: Array<{ hour: string; output: number }>;
  workOrders: WorkOrder[];
};

export const getProductionOverview = async (): Promise<ProductionOverview> => {
  const response = await api.get<ProductionOverview>(apiRoutes.dashboard.production);
  return response.data;
};
