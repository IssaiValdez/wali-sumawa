'use client';

import { TarjetaPedido } from './TarjetaPedido';
import { useCocinero } from '@/lib/cocinero/context';

export function ListaPedidosPendientes() {
  const { pedidos } = useCocinero();
  
  const pedidosPendientes = pedidos.filter(
    p => p.estado === 'pendiente' || p.estado === 'preparando'
  ).sort((a, b) => {
    if (a.estado === 'preparando' && b.estado === 'pendiente') return -1;
    if (a.estado === 'pendiente' && b.estado === 'preparando') return 1;
    return a.fechaCreacion.getTime() - b.fechaCreacion.getTime();
  });

  if (pedidosPendientes.length === 0) {
    return (
      <div className="bg-green-100 border-2 border-green-300 rounded-lg p-8 text-center">
        <p className="text-2xl font-bold text-green-700">✅ ¡Sin pedidos pendientes!</p>
        <p className="text-green-600 mt-2">Puedes descansar un momento</p>
      </div>
    );
  }

  const preparando = pedidosPendientes.filter(p => p.estado === 'preparando');
  const pendientes = pedidosPendientes.filter(p => p.estado === 'pendiente');

  return (
    <div className="space-y-4">
      {preparando.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-yellow-700 mb-2">👨‍🍳 En Preparación ({preparando.length})</h3>
          {preparando.map(pedido => (
            <TarjetaPedido key={pedido.id} pedido={pedido} />
          ))}
        </div>
      )}

      {pendientes.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-red-700 mb-2">⏳ Pendientes ({pendientes.length})</h3>
          {pendientes.map(pedido => (
            <TarjetaPedido key={pedido.id} pedido={pedido} />
          ))}
        </div>
      )}
    </div>
  );
}
