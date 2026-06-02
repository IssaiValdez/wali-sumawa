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
        className="w-full bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white font-bold py-4 px-5 rounded-xl hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      >
        ⚙️ Configuración
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-slate-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">⚙️ Configuración</h2>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="border-2 border-orange-300 rounded-xl p-4 hover:bg-orange-50 transition-all cursor-pointer group">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={configuracion.cocinaSaturada}
                      onChange={(e) =>
                        actualizarConfiguracion({ cocinaSaturada: e.target.checked })
                      }
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800 group-hover:text-orange-700">🍳 Cocina Saturada</p>
                    <p className="text-xs text-gray-600 group-hover:text-orange-600">
                      {configuracion.cocinaSaturada
                        ? 'Notificando retrasos a los cajeros'
                        : 'Operación normal'}
                    </p>
                  </div>
                  {configuracion.cocinaSaturada && (
                    <span className="text-red-500 font-bold text-2xl animate-pulse">⚠️</span>
                  )}
                </label>
              </div>

              <div className="border-2 border-blue-300 rounded-xl p-4 hover:bg-blue-50 transition-all cursor-pointer group">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={configuracion.pausa}
                      onChange={(e) =>
                        actualizarConfiguracion({ pausa: e.target.checked })
                      }
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800 group-hover:text-blue-700">⏸️ Pausar Entrada</p>
                    <p className="text-xs text-gray-600 group-hover:text-blue-600">
                      {configuracion.pausa
                        ? 'Nuevos pedidos en espera'
                        : 'Aceptando nuevos pedidos'}
                    </p>
                  </div>
                  {configuracion.pausa && (
                    <span className="text-blue-500 font-bold text-2xl animate-pulse">⏸️</span>
                  )}
                </label>
              </div>

              <div className="border-2 border-purple-300 rounded-xl p-4 hover:bg-purple-50 transition-all cursor-pointer group">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={configuracion.sonidoNotificacion}
                      onChange={(e) =>
                        actualizarConfiguracion({ sonidoNotificacion: e.target.checked })
                      }
                      className="w-6 h-6 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800 group-hover:text-purple-700">🔔 Sonido</p>
                    <p className="text-xs text-gray-600 group-hover:text-purple-600">
                      {configuracion.sonidoNotificacion ? 'Activado' : 'Desactivado'}
                    </p>
                  </div>
                  {configuracion.sonidoNotificacion && (
                    <span className="text-purple-500 font-bold text-2xl">🔊</span>
                  )}
                </label>
              </div>

              <div className="bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-100 border-2 border-blue-400 rounded-xl p-4 mt-4">
                <p className="font-bold text-blue-900 text-lg mb-3">📊 Estado Actual</p>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex justify-between items-center">
                    <span>Pedidos Pendientes:</span>
                    <span className="font-bold text-lg bg-white px-3 py-1 rounded-lg">{pedidosPendientes}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Cocina Saturada:</span>
                    <span className="font-bold">{configuracion.cocinaSaturada ? '🔴 SÍ' : '🟢 NO'}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>En Pausa:</span>
                    <span className="font-bold">{configuracion.pausa ? '🔴 SÍ' : '🟢 NO'}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Sonido:</span>
                    <span className="font-bold">{configuracion.sonidoNotificacion ? '🔊 SÍ' : '🔇 NO'}</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setMostrarModal(false)}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
