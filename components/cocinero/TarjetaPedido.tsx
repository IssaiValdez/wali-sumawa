'use client';

import { useState } from 'react';
import { Pedido } from '@/lib/cocinero/types';
import { useCocinero } from '@/lib/cocinero/context';
import { formatearFecha, calcularTiempoTranscurrido } from '@/lib/cocinero/utils';

export function TarjetaPedido({ pedido }: { pedido: Pedido }) {
  const { actualizarEstadoPedido, asignarTiempoEstimado } = useCocinero();
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [tiempoInput, setTiempoInput] = useState(pedido.tiempoEstimado?.toString() || '');
  const [mostrarNotas, setMostrarNotas] = useState(false);

  const handleAsignarTiempo = () => {
    const minutos = parseInt(tiempoInput);
    if (!isNaN(minutos) && minutos > 0) {
      asignarTiempoEstimado(pedido.id, minutos);
      setMostrarTiempo(false);
    }
  };

  const estadoColores: { [key: string]: string } = {
    pendiente: 'bg-red-100 border-red-300 text-red-700',
    preparando: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    entregado: 'bg-green-100 border-green-300 text-green-700',
    cancelado: 'bg-gray-100 border-gray-300 text-gray-700',
  };

  const estadoTextos: { [key: string]: string } = {
    pendiente: '⏳ Pendiente',
    preparando: '👨‍🍳 Preparando',
    entregado: '✅ Entregado',
    cancelado: '❌ Cancelado',
  };

  return (
    <div className={`border-2 rounded-lg p-4 mb-3 ${estadoColores[pedido.estado]}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold">Pedido #{pedido.numero}</h3>
          <p className="text-sm opacity-75">{calcularTiempoTranscurrido(pedido.fechaCreacion)} en preparación</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full">
          {estadoTextos[pedido.estado]}
        </span>
      </div>

      {pedido.cliente && <p className="text-sm mb-2">👤 Cliente: {pedido.cliente}</p>}
      {pedido.mesa && <p className="text-sm mb-2">🪑 Mesa: {pedido.mesa}</p>}

      <div className="bg-white bg-opacity-50 rounded p-3 mb-3">
        <h4 className="font-semibold mb-2 text-sm">Productos:</h4>
        <ul className="space-y-2">
          {pedido.items.map((item, idx) => (
            <li key={idx} className="text-sm border-l-2 border-current pl-2">
              <span className="font-semibold">
                {item.cantidad}x {item.nombre}
              </span>
              {item.notas && (
                <p className="text-xs italic opacity-75">
                  📝 Notas: {item.notas}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {pedido.tiempoEstimado && (
        <div className="bg-blue-50 rounded p-2 mb-3 text-sm font-semibold">
          ⏱️ Tiempo estimado: {pedido.tiempoEstimado} minutos
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {pedido.estado === 'pendiente' && (
          <button
            onClick={() => actualizarEstadoPedido(pedido.id, 'preparando')}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-semibold"
          >
            👨‍🍳 Empezar Preparación
          </button>
        )}
        {(pedido.estado === 'pendiente' || pedido.estado === 'preparando') && (
          <button
            onClick={() => actualizarEstadoPedido(pedido.id, 'entregado')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold"
          >
            ✅ Entregado
          </button>
        )}
        {pedido.estado !== 'entregado' && pedido.estado !== 'cancelado' && (
          <button
            onClick={() => actualizarEstadoPedido(pedido.id, 'cancelado')}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-semibold"
          >
            ❌ Cancelar
          </button>
        )}
        <button
          onClick={() => setMostrarTiempo(!mostrarTiempo)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-semibold"
        >
          ⏱️ Tiempo
        </button>
      </div>

      {mostrarTiempo && (
        <div className="mt-3 p-2 bg-blue-50 rounded flex gap-2">
          <input
            type="number"
            min="1"
            max="120"
            value={tiempoInput}
            onChange={(e) => setTiempoInput(e.target.value)}
            placeholder="Minutos"
            className="px-2 py-1 border rounded flex-1 text-sm"
          />
          <button
            onClick={handleAsignarTiempo}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-semibold"
          >
            Asignar
          </button>
        </div>
      )}
    </div>
  );
}
