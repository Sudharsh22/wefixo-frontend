type Props = {
  eyebrow?: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionCard({ eyebrow, title, badge, children, className }: Props) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 ${className ?? ""}`.trim()}>
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">{eyebrow}</p> : null}
          <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>
        </div>
        {badge ? (
          <div className="rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md shadow-[0_0_12px_rgba(244,0,9,0.15)]">
            {badge}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  );
}
