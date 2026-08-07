import { AlertCircle } from "lucide-react";

type Props = {
  title: string;
  description: string;
  onRetry?: () => void;
};

export default function ErrorState({ title, description, onRetry }: Props) {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-200">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/15">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-red-100/80">{description}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500/25"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
