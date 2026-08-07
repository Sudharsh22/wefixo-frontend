import { api, apiRoutes } from "../api/api";

export type MachineKpi = {
  title: string;
  value: string;
  subtitle: string;
  icon: "cpu" | "zap" | "activity" | "hardHat";
  tone: "cyan" | "emerald" | "amber" | "red";
};

export type MachineStatus = {
  id: string;
  name: string;
  line: string;
  status: "Running" | "Idle" | "Maintenance";
  utilization: number;
  shiftOutput: string;
};

export type MachineOverview = {
  kpis: MachineKpi[];
  utilizationData: Array<{ name: string; utilization: number }>;
  machineStatuses: MachineStatus[];
};

export const getMachineOverview = async (): Promise<MachineOverview> => {
  const response = await api.get<MachineOverview>(apiRoutes.machines);
  return response.data;
};
