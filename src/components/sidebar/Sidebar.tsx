import { NavLink, useNavigate } from "react-router-dom";
import { getAllowedRoutes, getStoredUser, logoutUser } from "../../utils/auth";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/production", label: "Production" },
  { to: "/machines", label: "Machines" },
  { to: "/inventory", label: "Inventory" },
  { to: "/maintenance", label: "Maintenance" },
  { to: "/work-orders", label: "Work Orders" },
  { to: "/machine-alerts", label: "Machine Alerts" },
  { to: "/insights", label: "AI Insights" },
  { to: "/reports", label: "Reports" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const visibleLinks = user ? links.filter((link) => getAllowedRoutes(user.role).includes(link.to)) : [];

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex h-auto w-full flex-col border-b border-white/10 bg-black/40 p-4 backdrop-blur-md md:h-screen md:w-72 md:border-b-0 md:border-r md:p-6 lg:w-72">
      <div>
        <div className="flex items-center justify-between gap-3 md:block">
          <div>
            <h1 className="text-2xl font-bold text-red-500 sm:text-3xl">WEFIXO</h1>
            <p className="mt-2 text-sm text-gray-400">Smart Factory AI</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300 md:hidden">
            Menu
          </div>
        </div>

        {user ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 md:mt-6">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs text-slate-400">{user.roleLabel}</p>
          </div>
        ) : null}
      </div>

      <nav className="mt-6 grid gap-2 sm:grid-cols-2 md:mt-10 md:grid-cols-1">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-xl px-3 py-2 text-sm transition ${isActive ? "bg-red-500/15 text-red-400" : "text-slate-300 hover:bg-white/5 hover:text-red-400"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-red-500/20 hover:text-red-400 md:mt-auto"
      >
        Logout
      </button>
    </aside>
  );
}