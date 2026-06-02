export function MeseroSidebar() {
  return (
    <div className="sticky top-6 space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Panel Mesero</p>
        <h2 className="text-2xl font-semibold text-slate-950">Operaciones en vivo</h2>
        <p className="text-sm leading-6 text-slate-600">
          Acceso rápido a pedidos, mesas, consultas y promociones.
        </p>
      </div>

      <nav className="space-y-2 text-sm text-slate-700">
        {[
          { label: "Dashboard", icon: "📊" },
          { label: "Pedidos", icon: "🍽️" },
          { label: "Mesa", icon: "🪑" },
          { label: "Consultas", icon: "💬" },
          { label: "Promociones", icon: "🏷️" },
          { label: "Historial", icon: "🕒" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-slate-300 hover:bg-slate-50"
          >
            <span>{item.label}</span>
            <span>{item.icon}</span>
          </button>
        ))}
      </nav>

      <div className="rounded-3xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Consejo</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Mantén los estados actualizados para que cocina y servicio tengan visibilidad real.
        </p>
      </div>
    </div>
  );
}
