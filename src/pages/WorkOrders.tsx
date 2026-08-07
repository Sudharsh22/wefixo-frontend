import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatusBadge from "../components/ui/StatusBadge";
import { useToast } from "../components/ui/ToastProvider";

type WorkOrderStatus = "Planned" | "In Progress" | "Completed";

type WorkOrder = {
  id: number;
  title: string;
  asset: string;
  priority: "High" | "Medium" | "Low";
  status: WorkOrderStatus;
  dueDate: string;
};

const initialWorkOrders: WorkOrder[] = [
  {
    id: 1,
    title: "Inspect bottling line B2 conveyor",
    asset: "Line B2 Conveyor",
    priority: "High",
    status: "Planned",
    dueDate: "2026-08-10",
  },
  {
    id: 2,
    title: "Replace seal on packaging cell C4",
    asset: "Packaging Cell C4",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-08-08",
  },
  {
    id: 3,
    title: "Calibration check for cold storage sensors",
    asset: "Cold Storage Zone",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-08-06",
  },
];

const statusTone: Record<WorkOrderStatus, "red" | "amber" | "emerald"> = {
  Planned: "red",
  "In Progress": "amber",
  Completed: "emerald",
};

export default function WorkOrdersPage() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [form, setForm] = useState<Omit<WorkOrder, "id">>({
    title: "",
    asset: "",
    priority: "Medium",
    status: "Planned",
    dueDate: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { pushToast } = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOrders(initialWorkOrders);
      setLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const summary = useMemo(() => {
    const total = orders.length;
    const planned = orders.filter((order) => order.status === "Planned").length;
    const inProgress = orders.filter((order) => order.status === "In Progress").length;
    const completed = orders.filter((order) => order.status === "Completed").length;

    return { total, planned, inProgress, completed };
  }, [orders]);

  const resetForm = () => {
    setForm({ title: "", asset: "", priority: "Medium", status: "Planned", dueDate: "" });
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title || !form.asset || !form.dueDate) {
      return;
    }

    if (editingId !== null) {
      setOrders((current) => current.map((order) => (order.id === editingId ? { ...order, ...form } : order)));
      pushToast({ title: "Work order updated", message: `${form.title} was updated successfully.`, tone: "success" });
    } else {
      setOrders((current) => [
        {
          id: Date.now(),
          ...form,
        },
        ...current,
      ]);
      pushToast({ title: "Work order created", message: `${form.title} was added to the queue.`, tone: "success" });
    }

    resetForm();
  };

  const handleEdit = (order: WorkOrder) => {
    setEditingId(order.id);
    setForm({
      title: order.title,
      asset: order.asset,
      priority: order.priority,
      status: order.status,
      dueDate: order.dueDate,
    });
  };

  const handleDelete = (id: number) => {
    const target = orders.find((order) => order.id === id);
    setOrders((current) => current.filter((order) => order.id !== id));
    if (editingId === id) {
      resetForm();
    }
    pushToast({ title: "Work order deleted", message: `${target?.title ?? "Selected order"} was removed.`, tone: "info" });
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      setOrders(initialWorkOrders);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.2),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <PageHeader
          eyebrow="Operations"
          title="Work Orders"
          description="Plan, track, and close maintenance and production tasks from one place."
          badge="Local state enabled"
        />

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Total</p>
            <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Planned</p>
            <p className="mt-2 text-2xl font-semibold">{summary.planned}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">In Progress</p>
            <p className="mt-2 text-2xl font-semibold">{summary.inProgress}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-sm text-slate-400">Completed</p>
            <p className="mt-2 text-2xl font-semibold">{summary.completed}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <SectionCard eyebrow="Form" title={editingId ? "Edit work order" : "Create work order"}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm text-slate-400">Title</label>
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm outline-none"
                  placeholder="e.g. Inspect line A1"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Asset</label>
                <input
                  value={form.asset}
                  onChange={(event) => setForm((current) => ({ ...current, asset: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm outline-none"
                  placeholder="Equipment or zone"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as WorkOrder["priority"] }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">Status</label>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as WorkOrderStatus }))}
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm outline-none"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Due date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                  <Plus className="h-4 w-4" />
                  {editingId ? "Save changes" : "Create work order"}
                </button>
                {editingId ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </SectionCard>

          <SectionCard eyebrow="List" title="Open tasks">
            {loading ? (
              <div className="space-y-3">
                <LoadingSkeleton className="h-24 w-full" />
                <LoadingSkeleton className="h-24 w-full" />
              </div>
            ) : error ? (
              <ErrorState title="Unable to load work orders" description="Please try again in a moment." onRetry={handleRetry} />
            ) : orders.length === 0 ? (
              <EmptyState title="No work orders yet" description="Create a task to begin tracking production and maintenance activities." />
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="animate-fade-up rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{order.title}</h3>
                          <StatusBadge label={order.status} tone={statusTone[order.status]} />
                        </div>
                        <p className="mt-2 text-sm text-slate-400">{order.asset}</p>
                      </div>
                      <div className="text-right text-sm text-slate-400">
                        <p>Priority: {order.priority}</p>
                        <p>Due: {order.dueDate}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(order)}
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </main>
    </div>
  );
}
