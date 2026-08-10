type Props = {
  eyebrow?: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionCard({ eyebrow, title, badge, children, className }: Props) {
  return (
    <section className={`rounded-[20px] border border-red-600/20 bg-[#0f0f0f]/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(255,26,26,0.2)] font-sans ${className ?? ""}`.trim()}>
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-red-950/80 pb-3.5">
        <div>
          {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-wider text-[#ff1a1a]">{eyebrow}</p> : null}
          <h2 className="mt-0.5 text-lg font-black text-white tracking-tight">{title}</h2>
        </div>
        {badge ? (
          <div className="rounded-full border border-red-600/40 bg-red-950/40 px-3.5 py-1 text-xs font-bold text-[#ff4d4d] shadow-[0_0_10px_rgba(255,26,26,0.2)]">
            {badge}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  );
}
