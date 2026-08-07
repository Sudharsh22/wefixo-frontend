import { NavLink, useNavigate } from "react-router-dom";
import { getAllowedRoutes, getStoredUser, logoutUser } from "../../utils/auth";
import {
  LayoutGrid,
  Factory,
  Cpu,
  Boxes,
  Wrench,
  FileText,
  AlertTriangle,
  Sparkles,
  BarChart3,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/production", label: "Production", icon: Factory },
  { to: "/machines", label: "Machines", icon: Cpu },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/work-orders", label: "Work Orders", icon: FileText },
  { to: "/machine-alerts", label: "Machine Alerts", icon: AlertTriangle },
  { to: "/insights", label: "AI Insights", icon: Sparkles },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const visibleLinks = user ? links.filter((link) => getAllowedRoutes(user.role).includes(link.to)) : links;

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex h-auto w-full flex-col border-b border-red-950/80 bg-[#020102] p-4 font-sans md:h-screen md:w-64 md:border-b-0 md:border-r md:p-5 lg:w-64 flex-shrink-0">
      <div>
        {/* Brand Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-tight text-[#ff1e27] drop-shadow-[0_0_12px_rgba(255,30,39,0.5)]">
              WEFIXO
            </h1>
          </div>
          <div className="mt-1 text-[10px] font-extrabold tracking-[0.25em] text-gray-300 uppercase">
            WEFIXO SMART FACTORY AI
          </div>
        </div>

        {/* User Card */}
        {user ? (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-950/90 bg-[#0a0204] p-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/20 text-[#ff1e27] border border-red-600/40">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[11px] text-gray-400">{user.roleLabel}</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-950/90 bg-[#0a0204] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/20 text-[#ff1e27] border border-red-600/40">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Alicia Chen</p>
                <p className="text-[11px] text-gray-400">Admin</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1.5 overflow-y-auto">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "border border-red-700/60 bg-gradient-to-r from-[#2a060a] to-[#140205] text-[#ff1e27] shadow-[0_0_12px_rgba(255,30,39,0.18)]"
                    : "text-gray-300 hover:bg-[#120305] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#ff1e27]" : "text-gray-400"}`} />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-red-950/90 bg-[#0a0204] px-4 py-2.5 text-xs font-semibold text-gray-300 transition-all hover:border-red-600/50 hover:bg-[#180306] hover:text-red-400"
      >
        <LogOut className="h-4 w-4 text-red-500" />
        <span>Logout</span>
      </button>
    </aside>
  );
}