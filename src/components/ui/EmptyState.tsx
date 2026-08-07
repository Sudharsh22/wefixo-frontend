import { Inbox } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/50 px-6 py-10 text-center text-slate-300">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <Inbox className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
    </div>
  );
}
