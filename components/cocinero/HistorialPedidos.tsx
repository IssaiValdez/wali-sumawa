'use client';

import { useCocinero } from '@/lib/cocinero/context';
import { formatearFecha } from '@/lib/cocinero/utils';

export function HistorialPedidos() {
  const { pedidos, limpiarHistorial } = useCocinero();

  const pedidosEntregados = pedidos
    .filter(p => p.estado === 'entregado')
    .sort((a, b) => (b.fechaEntrega?.getTime() || 0) - (a.fechaEntrega?.getTime() || 0));

  if (pedidosEntregados.length === 0) {
    return (
      <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 text-center">
        <p className="text-xl font-bold text-gray-700">📜 No hay pedidos entregados aún</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">✅ Historial de Entregados</h2>
        <button
          onClick={limpiarHistorial}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-semibold"
        >
          Limpiar Historial
        </button>
      </div>

      <div className="grid gap-3">
        {pedidosEntregados.map(pedido => (
          <div key={pedido.id} className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-green-700">Pedido #{pedido.numero}</h3>
                {pedido.cliente && <p className="text-sm text-gray-600">👤 {pedido.cliente}</p>}
                {pedido.mesa && <p className="text-sm text-gray-600">🪑 Mesa {pedido.mesa}</p>}
              </div>
              <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full font-semibold">
                ✅ Entregado
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              📅 Entregado: {pedido.fechaEntrega ? formatearFecha(pedido.fechaEntrega) : 'N/A'}
            </p>

            <div className="bg-white rounded p-2 mb-2">
              <p className="text-sm font-semibold mb-1">Productos:</p>
              <ul className="text-sm space-y-1">
                {pedido.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700">
                    {item.cantidad}x {item.nombre}
                    {item.notas && <span className="text-xs italic"> - {item.notas}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
