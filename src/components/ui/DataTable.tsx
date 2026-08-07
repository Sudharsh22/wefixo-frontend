type Column = {
  key: string;
  label: string;
};

type Props<T extends Record<string, unknown>> = {
  columns: Column[];
  rows: T[];
  renderRow?: (row: T) => React.ReactNode;
  title?: string;
  badge?: string;
};

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  renderRow,
  title,
  badge,
}: Props<T>) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
      {(title || badge) && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
          </div>
          {badge ? <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{badge}</div> : null}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-white/10 last:border-none">
                {renderRow ? renderRow(row) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
