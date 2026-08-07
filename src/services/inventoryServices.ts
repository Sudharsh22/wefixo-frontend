import { api, apiRoutes } from "../api/api";

export type InventoryKpi = {
  title: string;
  value: string;
  subtitle: string;
  icon: "boxes" | "package" | "shieldAlert" | "rotateCw";
  tone: "cyan" | "emerald" | "amber" | "red";
};

export type InventoryItem = {
  material: string;
  availableQty: number;
  reservedQty: number;
  reorderLevel: number;
  status: "Healthy" | "Low" | "Critical";
};

export type InventoryOverview = {
  kpis: InventoryKpi[];
  distribution: Array<{ name: string; value: number; color: string }>;
  stockLevels: Array<{ material: string; available: number; reorder: number }>;
  items: InventoryItem[];
};

export const getInventoryOverview = async (): Promise<InventoryOverview> => {
  const response = await api.get<InventoryOverview>(apiRoutes.inventory);
  return response.data;
};
