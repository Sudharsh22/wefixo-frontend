type Props = {
  eyebrow?: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionCard({ eyebrow, title, badge, children, className }: Props) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur ${className ?? ""}`.trim()}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          {eyebrow ? <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p> : null}
          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
        </div>
        {badge ? <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{badge}</div> : null}
      </div>

      {children}
    </section>
  );
}
