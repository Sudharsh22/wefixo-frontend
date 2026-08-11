import axios from "axios";

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment ? 'http://localhost:5000/api' : 'https://wefixo-backend.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("wefixo-auth-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const apiRoutes = {
  dashboard: {
    metrics: "/dashboard/metrics",
    production: "/dashboard/production",
    alerts: "/dashboard/alerts",
  },
  inventory: "/inventory",
  machines: "/machines",
  maintenance: "/maintenance",
  workOrders: "/work-orders",
  reports: "/reports",
  workflows: {
    demandForecast: "/workflows/demand-forecast"
  }
};
