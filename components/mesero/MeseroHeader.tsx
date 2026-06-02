import type { ReactNode } from "react";

interface MeseroHeaderProps {
  title: string;
  subtitle: string;
  actionLabel: string;
  actionOnClick: () => void;
}

export function MeseroHeader({ title, subtitle, actionLabel, actionOnClick }: MeseroHeaderProps) {
  return (
    <header className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sección mesero</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={actionOnClick}
          className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {actionLabel}
        </button>
      </div>
    </header>
  );
}
