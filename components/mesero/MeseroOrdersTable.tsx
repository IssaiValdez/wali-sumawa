import { useMemo, useState } from "react";
import type { Order, OrderHistoryEntry, OrderStatus } from "@/components/mesero/types";

interface MeseroOrdersTableProps {
  orders: Order[];
  history: OrderHistoryEntry[];
  statusFilter: string;
  onFilterChange: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onChangeStatus: (orderId: string, status: OrderStatus) => void;
  onEditOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

export function MeseroOrdersTable({
  orders,
  history,
  statusFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
  onChangeStatus,
  onEditOrder,
  onCancelOrder,
}: MeseroOrdersTableProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const historyMap = useMemo(
    () =>
      history.reduce<Record<string, OrderHistoryEntry[]>>((map, entry) => {
        map[entry.orderId] = map[entry.orderId] ?? [];
        map[entry.orderId].push(entry);
        return map;
      }, {}),
    [history],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar pedido..."
            className="w-full min-w-[220px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
          <select
            value={statusFilter}
            onChange={(event) => onFilterChange(event.target.value)}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          >
            <option>Todo</option>
            <option>Pendiente</option>
            <option>En preparación</option>
            <option>Listo</option>
            <option>Entregado</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-slate-700">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4"># Pedido</th>
              <th className="px-4 py-4">Cliente</th>
              <th className="px-4 py-4">Mesa</th>
              <th className="px-4 py-4">Hora</th>
              <th className="px-4 py-4">Estado</th>
              <th className="px-4 py-4">Origen</th>
              <th className="px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-200 last:border-b">
                <td className="px-4 py-4 font-medium text-slate-900">{order.number}</td>
                <td className="px-4 py-4">{order.customer}</td>
                <td className="px-4 py-4">{order.table}</td>
                <td className="px-4 py-4">{order.time}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "Pendiente"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "En preparación"
                        ? "bg-sky-100 text-sky-800"
                        : order.status === "Listo"
                        ? "bg-emerald-100 text-emerald-800"
                        : order.status === "Entregado"
                        ? "bg-slate-100 text-slate-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4">{order.origin}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {order.status !== "Entregado" && order.status !== "Cancelado" ? (
                      <button
                        type="button"
                        className="rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                        onClick={() => onChangeStatus(order.id, "En preparación")}
                      >
                        Preparar
                      </button>
                    ) : null}
                    {order.status === "En preparación" ? (
                      <button
                        type="button"
                        className="rounded-2xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
                        onClick={() => onChangeStatus(order.id, "Listo")}
                      >
                        Listo
                      </button>
                    ) : null}
                    {order.status === "Listo" ? (
                      <button
                        type="button"
                        className="rounded-2xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-500"
                        onClick={() => onChangeStatus(order.id, "Entregado")}
                      >
                        Entregar
                      </button>
                    ) : null}
                    {order.status === "Pendiente" ? (
                      <>
                        <button
                          type="button"
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100"
                          onClick={() => onEditOrder(order.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800 transition hover:bg-rose-100"
                          onClick={() => onCancelOrder(order.id)}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : null}
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100"
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    >
                      Historial
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
          No se encontraron pedidos con los filtros actuales.
        </div>
      ) : null}

      {expandedOrderId ? (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-950">Historial de pedido</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {(historyMap[expandedOrderId] ?? []).map((entry) => (
              <li key={entry.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/50">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                  <span>{entry.timestamp}</span>
                  <span>{entry.orderId}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{entry.summary}</p>
              </li>
            ))}
            {(historyMap[expandedOrderId] ?? []).length === 0 ? (
              <li className="rounded-3xl bg-white p-4 text-slate-600">No hay historial registrado para este pedido.</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
