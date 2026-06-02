interface MetricCard {
  label: string;
  value: number;
  accent: string;
}

interface MeseroMetricsProps {
  metrics: MetricCard[];
}

export function MeseroMetrics({ metrics }: MeseroMetricsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-900 p-6 text-white shadow-xl shadow-slate-900/10"
          style={{ backgroundImage: metric.accent }}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-slate-300">{metric.label}</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">{metric.value}</p>
        </div>
      ))}
    </section>
  );
}
