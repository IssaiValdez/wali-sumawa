import type { OrderHistoryEntry } from "@/components/mesero/types";

interface MeseroHistoryPanelProps {
  history: OrderHistoryEntry[];
}

export function MeseroHistoryPanel({ history }: MeseroHistoryPanelProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Historial</p>
          <h2 className="text-2xl font-semibold text-slate-950">Registro de cambios</h2>
        </div>
        <p className="text-sm text-slate-600">Revisa el histórico de movimientos de pedidos y estados.</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
        <table className="w-full border-collapse text-left text-sm text-slate-700">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4">Hora</th>
              <th className="px-4 py-4">Pedido</th>
              <th className="px-4 py-4">Cambios</th>
            </tr>
          </thead>
          <tbody>
            {history.slice(0, 6).map((entry) => (
              <tr key={entry.id} className="border-t border-slate-200 bg-white">
                <td className="px-4 py-4 text-slate-600">{entry.timestamp}</td>
                <td className="px-4 py-4 font-medium text-slate-900">{entry.orderId}</td>
                <td className="px-4 py-4 text-slate-700">{entry.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
