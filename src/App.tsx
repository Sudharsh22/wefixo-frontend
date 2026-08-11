import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/Dashboard";
import AIInsightsPage from "./pages/ALInsights";
import InventoryPage from "./pages/Inventory";
import MachinesPage from "./pages/Machines";
import MaintenancePage from "./pages/Maintenance";
import ProductionPage from "./pages/Production";
import ReportsPage from "./pages/Reports";
import WorkOrdersPage from "./pages/WorkOrders";
import MachineAlertsPage from "./pages/MachineAlerts";
import LoginPage from "./pages/login";
import DemandForecastPage from "./pages/DemandForecast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<ProtectedRoute requiredPath="/dashboard"><DashboardPage /></ProtectedRoute>} />
        <Route path="/production" element={<ProtectedRoute requiredPath="/production"><ProductionPage /></ProtectedRoute>} />
        <Route path="/machines" element={<ProtectedRoute requiredPath="/machines"><MachinesPage /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute requiredPath="/inventory"><InventoryPage /></ProtectedRoute>} />
        <Route path="/maintenance" element={<ProtectedRoute requiredPath="/maintenance"><MaintenancePage /></ProtectedRoute>} />
        <Route path="/work-orders" element={<ProtectedRoute requiredPath="/work-orders"><WorkOrdersPage /></ProtectedRoute>} />
        <Route path="/machine-alerts" element={<ProtectedRoute requiredPath="/machine-alerts"><MachineAlertsPage /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute requiredPath="/insights"><AIInsightsPage /></ProtectedRoute>} />
        <Route path="/demand-forecast" element={<ProtectedRoute requiredPath="/demand-forecast"><DemandForecastPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute requiredPath="/reports"><ReportsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;