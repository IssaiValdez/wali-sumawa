'use client';

import { useState } from 'react';
import { useCocinero } from '@/lib/cocinero/context';

export function Configuracion() {
  const { configuracion, actualizarConfiguracion, pedidos } = useCocinero();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarRecetas, setMostrarRecetas] = useState(false);

  const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente' || p.estado === 'preparando').length;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setMostrarModal(!mostrarModal)}
        className="w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:from-slate-700 hover:to-slate-900 transition"
      >
        ⚙️ Configuración
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Configuración</h2>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="border rounded p-4 hover:bg-gray-50 transition">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configuracion.cocinaSaturada}
                    onChange={(e) =>
                      actualizarConfiguracion({ cocinaSaturada: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">🍳 Cocina Saturada</p>
                    <p className="text-xs text-gray-600">
                      {configuracion.cocinaSaturada
                        ? 'Notificar retrasos a cajeros'
                        : 'Operación normal'}
                    </p>
                  </div>
                  {configuracion.cocinaSaturada && (
                    <span className="text-red-500 font-bold text-lg">⚠️</span>
                  )}
                </label>
              </div>

              <div className="border rounded p-4 hover:bg-gray-50 transition">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configuracion.pausa}
                    onChange={(e) =>
                      actualizarConfiguracion({ pausa: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">⏸️ Pausar Entrada de Pedidos</p>
                    <p className="text-xs text-gray-600">
                      {configuracion.pausa
                        ? 'Nuevos pedidos en espera'
                        : 'Aceptando pedidos'}
                    </p>
                  </div>
                </label>
              </div>

              <div className="border rounded p-4 hover:bg-gray-50 transition">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configuracion.sonidoNotificacion}
                    onChange={(e) =>
                      actualizarConfiguracion({ sonidoNotificacion: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">🔔 Sonido de Notificaciones</p>
                    <p className="text-xs text-gray-600">
                      {configuracion.sonidoNotificacion ? 'Activado' : 'Desactivado'}
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-700">
                <p className="font-semibold mb-2">📊 Estado Actual</p>
                <ul className="space-y-1">
                  <li>Pedidos Pendientes: <span className="font-bold">{pedidosPendientes}</span></li>
                  <li>Cocina Saturada: {configuracion.cocinaSaturada ? '🔴 Sí' : '🟢 No'}</li>
                  <li>En Pausa: {configuracion.pausa ? '🔴 Sí' : '🟢 No'}</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setMostrarModal(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
