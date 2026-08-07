import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Toast = {
  id: number;
  title: string;
  message: string;
  tone: "success" | "error" | "info";
};

type ToastContextValue = {
  pushToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [toasts]);

  const pushToast = (toast: Omit<Toast, "id">) => {
    setToasts((current) => [...current, { ...toast, id: Date.now() + Math.random() }]);
  };

  const value = useMemo(() => ({ pushToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur ${
              toast.tone === "success"
                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
                : toast.tone === "error"
                  ? "border-red-500/30 bg-red-500/15 text-red-200"
                  : "border-cyan-500/30 bg-cyan-500/15 text-cyan-200"
            }`}
          >
            <p className="font-semibold">{toast.title}</p>
            <p className="mt-1 text-sm/5 opacity-90">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
