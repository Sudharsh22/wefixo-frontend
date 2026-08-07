import { api, apiRoutes } from "../api/api";

export type ReportStatus = "Ready" | "Processing" | "Archived";

export type ReportRow = {
  name: string;
  type: string;
  generated: string;
  owner: string;
  status: ReportStatus;
};

export type ReportOverview = {
  kpis: Array<{
    title: string;
    value: string;
    subtitle: string;
    icon: "barChart3" | "package" | "wrench";
    tone: "cyan" | "emerald" | "amber" | "red";
  }>;
  reportHistory: ReportRow[];
};

export const getReportOverview = async (): Promise<ReportOverview> => {
  const response = await api.get<ReportOverview>(apiRoutes.reports);
  return response.data;
};
