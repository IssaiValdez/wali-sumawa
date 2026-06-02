'use client';

import { useState } from 'react';
import { useCocinero } from '@/lib/cocinero/context';
import { Producto } from '@/lib/cocinero/types';

export function VisorRecetas() {
  const { productos } = useCocinero();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  return (
    <>
      <button
        onClick={() => setMostrarModal(!mostrarModal)}
        className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold py-4 px-5 rounded-xl hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      >
        📖 Recetas y Procesos
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl border-2 border-green-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {productoSeleccionado ? '📋 Receta Detallada' : '📖 Selecciona un Producto'}
              </h2>
              <button
                onClick={() => {
                  setMostrarModal(false);
                  setProductoSeleccionado(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>

            {!productoSeleccionado ? (
              <div className="grid grid-cols-1 gap-3 animation-slideDown">
                {productos.map(producto => (
                  <button
                    key={producto.id}
                    onClick={() => setProductoSeleccionado(producto)}
                    className={`text-left p-5 border-2 rounded-xl transition-all transform hover:scale-105 active:scale-95 ${
                      producto.agotado
                        ? 'bg-gray-100 border-gray-300 opacity-40 cursor-not-allowed'
                        : 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-500 shadow-md hover:shadow-lg'
                    }`}
                    disabled={producto.agotado}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-green-800">{producto.nombre}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1 mt-1">{producto.receta}</p>
                        {producto.tiempoPreparacion && (
                          <p className="text-xs text-green-600 font-semibold mt-2">⏱️ {producto.tiempoPreparacion} min</p>
                        )}
                      </div>
                      {producto.agotado && <span className="text-red-600 font-bold text-lg">AGOTADO</span>}
                      {!producto.agotado && <span className="text-green-600 font-bold text-2xl">→</span>}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4 animation-slideDown">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 p-6 rounded-xl shadow-md">
                  <h3 className="text-3xl font-bold text-green-800 mb-3">
                    {productoSeleccionado.nombre}
                  </h3>
                  {productoSeleccionado.tiempoPreparacion && (
                    <p className="text-lg font-bold text-green-700 mb-3 bg-white px-4 py-2 rounded-lg inline-block">
                      ⏱️ Tiempo estimado: {productoSeleccionado.tiempoPreparacion} minutos
                    </p>
                  )}
                  <p className="text-sm text-green-700">💰 Precio: ${productoSeleccionado.precio.toFixed(2)}</p>
                </div>

                <div className="border-l-4 border-green-600 bg-white rounded-lg p-5 shadow-md">
                  <h4 className="font-bold text-lg text-green-800 mb-3 flex items-center gap-2">
                    <span>📋 Receta / Proceso de Preparación</span>
                  </h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm font-medium">
                    {productoSeleccionado.receta}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-lg p-5 text-sm text-yellow-900 shadow-md">
                  <p className="font-bold mb-3 text-lg">💡 Consejos Importantes</p>
                  <ul className="list-disc list-inside space-y-2 text-sm font-medium">
                    <li>Sigue la receta exactamente para mantener consistencia en la calidad</li>
                    <li>Verifica que todos los ingredientes estén disponibles antes de comenzar</li>
                    <li>Comunica inmediatamente si algún ingrediente se agota</li>
                    <li>Respeta los tiempos de cocción recomendados para obtener el mejor resultado</li>
                    <li>Mantén la higiene y el orden en la estación de trabajo</li>
                    <li>Si es personal nuevo, pide ayuda sin dudarlo</li>
                  </ul>
                </div>

                <button
                  onClick={() => setProductoSeleccionado(null)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  ← Volver a Productos
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
