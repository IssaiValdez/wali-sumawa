'use client';

import { useState } from 'react';
import { Pedido } from '@/lib/cocinero/types';
import { useCocinero } from '@/lib/cocinero/context';
import { formatearFecha, calcularTiempoTranscurrido } from '@/lib/cocinero/utils';

export function TarjetaPedido({ pedido }: { pedido: Pedido }) {
  const { actualizarEstadoPedido, asignarTiempoEstimado } = useCocinero();
  const [mostrarTiempo, setMostrarTiempo] = useState(false);
  const [tiempoInput, setTiempoInput] = useState(pedido.tiempoEstimado?.toString() || '');
  const [expandido, setExpandido] = useState(false);

  const handleAsignarTiempo = () => {
    const minutos = parseInt(tiempoInput);
    if (!isNaN(minutos) && minutos > 0) {
      asignarTiempoEstimado(pedido.id, minutos);
      setMostrarTiempo(false);
    }
  };

  const estadoConfig: { [key: string]: { bg: string; border: string; text: string; icon: string; badge: string } } = {
    pendiente: {
      bg: 'bg-gradient-to-br from-red-50 to-orange-50',
      border: 'border-2 border-red-300 hover:border-red-400',
      text: 'text-red-700',
      icon: '⏳',
      badge: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
    },
    preparando: {
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      border: 'border-2 border-amber-300 hover:border-amber-400',
      text: 'text-amber-700',
      icon: '👨‍🍳',
      badge: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
    },
    entregado: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      border: 'border-2 border-green-300 hover:border-green-400',
      text: 'text-green-700',
      icon: '✅',
      badge: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    },
    cancelado: {
      bg: 'bg-gradient-to-br from-gray-100 to-gray-50',
      border: 'border-2 border-gray-300 hover:border-gray-400',
      text: 'text-gray-600',
      icon: '❌',
      badge: 'bg-gray-500 text-white',
    },
  };

  const config = estadoConfig[pedido.estado];

  return (
    <div
      className={`${config.bg} ${config.border} rounded-xl p-5 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] cursor-pointer`}
      onClick={() => setExpandido(!expandido)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-2xl font-bold ${config.text}`}>Pedido #{pedido.numero}</h3>
            {pedido.tiempoEstimado && (
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                ⏱️ {pedido.tiempoEstimado}m
              </span>
            )}
          </div>
          <p className={`text-xs font-medium ${config.text} opacity-75`}>
            {calcularTiempoTranscurrido(pedido.fechaCreacion)} en preparación
          </p>
        </div>
        <span className={`${config.badge} font-bold px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-md`}>
          {config.icon} {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
        </span>
      </div>

      {/* Cliente y Mesa */}
      <div className="flex gap-4 mb-3 text-sm font-medium">
        {pedido.cliente && (
          <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-lg">
            👤 {pedido.cliente}
          </span>
        )}
        {pedido.mesa && (
          <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-lg">
            🪑 Mesa {pedido.mesa}
          </span>
        )}
      </div>

      {/* Productos */}
      <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-3 backdrop-blur-sm">
        <h4 className="font-bold text-sm mb-3 flex items-center gap-1">
          <span>📦 Productos ({pedido.items.length})</span>
        </h4>
        <ul className="space-y-2">
          {pedido.items.map((item, idx) => (
            <li key={idx} className={`text-sm border-l-4 border-current pl-3 py-1 ${config.text}`}>
              <span className="font-bold text-base">{item.cantidad}x</span> {item.nombre}
              {item.notas && (
                <div className="text-xs italic opacity-80 mt-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-block mt-1 ml-0">
                  📝 {item.notas}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Botones de Acción */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {pedido.estado === 'pendiente' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              actualizarEstadoPedido(pedido.id, 'preparando');
            }}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-lg hover:from-amber-500 hover:to-yellow-500 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            👨‍🍳 Preparar
          </button>
        )}
        {(pedido.estado === 'pendiente' || pedido.estado === 'preparando') && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              actualizarEstadoPedido(pedido.id, 'entregado');
            }}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            ✅ Entregar
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMostrarTiempo(!mostrarTiempo);
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          ⏱️ Tiempo
        </button>
        {pedido.estado !== 'entregado' && pedido.estado !== 'cancelado' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              actualizarEstadoPedido(pedido.id, 'cancelado');
            }}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-lg hover:from-red-500 hover:to-pink-500 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            ❌ Cancelar
          </button>
        )}
      </div>

      {/* Input de Tiempo */}
      {mostrarTiempo && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-3 p-3 bg-blue-100 border-2 border-blue-300 rounded-lg flex gap-2 animation-slideDown"
        >
          <input
            type="number"
            min="1"
            max="120"
            value={tiempoInput}
            onChange={(e) => setTiempoInput(e.target.value)}
            placeholder="Minutos"
            className="px-3 py-2 border-2 border-blue-300 rounded-lg flex-1 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAsignarTiempo();
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Asignar
          </button>
        </div>
      )}
    </div>
  );
}
