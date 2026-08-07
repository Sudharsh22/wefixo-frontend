type Props = {
  eyebrow?: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionCard({ eyebrow, title, badge, children, className }: Props) {
  return (
    <section className={`rounded-xl border border-red-950/90 bg-[#060204] p-5 shadow-xl transition-all duration-200 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(255,30,39,0.18)] font-sans ${className ?? ""}`.trim()}>
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-red-950/80 pb-3.5">
        <div>
          {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-wider text-[#ff1e27]">{eyebrow}</p> : null}
          <h2 className="mt-0.5 text-lg font-black text-white">{title}</h2>
        </div>
        {badge ? (
          <div className="rounded-xl border border-red-900/60 bg-red-950/40 px-3 py-1 text-xs font-bold text-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.15)]">
            {badge}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  );
}

