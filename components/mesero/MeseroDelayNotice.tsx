interface MeseroDelayNoticeProps {
  currentEta: string;
  onNotifyDelay: () => void;
  pendingOrders: number;
}

export function MeseroDelayNotice({ currentEta, onNotifyDelay, pendingOrders }: MeseroDelayNoticeProps) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/40">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Demoras</p>
          <h2 className="text-2xl font-semibold text-slate-950">Notificar retraso</h2>
        </div>
        <p className="text-sm text-slate-600">Registra el nuevo tiempo estimado para los pedidos pendientes y avisa a los clientes.</p>
      </div>

      <div className="mt-6 space-y-4 rounded-3xl bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Pedidos pendientes</p>
            <p className="mt-1 text-3xl font-semibold text-slate-950">{pendingOrders}</p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">ETA actual: {currentEta}</div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onNotifyDelay}
            className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Notificar demora
          </button>
          <p className="text-sm text-slate-600">Esta acción registra el aviso emitido en el historial de pedidos.</p>
        </div>
      </div>
    </div>
  );
}
