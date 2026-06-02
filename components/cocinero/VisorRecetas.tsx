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
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition"
      >
        📖 Recetas y Procesos
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {productoSeleccionado ? 'Receta' : 'Selecciona un Producto'}
              </h2>
              <button
                onClick={() => {
                  setMostrarModal(false);
                  setProductoSeleccionado(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {!productoSeleccionado ? (
              <div className="grid grid-cols-1 gap-3">
                {productos.map(producto => (
                  <button
                    key={producto.id}
                    onClick={() => setProductoSeleccionado(producto)}
                    className={`text-left p-4 border rounded-lg transition hover:shadow-md ${
                      producto.agotado
                        ? 'bg-gray-100 border-gray-300 opacity-50'
                        : 'border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{producto.nombre}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{producto.receta}</p>
                      </div>
                      {producto.agotado && <span className="text-red-500 font-bold">AGOTADO</span>}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    {productoSeleccionado.nombre}
                  </h3>
                  {productoSeleccionado.tiempoPreparacion && (
                    <p className="text-green-600 font-semibold mb-3">
                      ⏱️ Tiempo estimado: {productoSeleccionado.tiempoPreparacion} minutos
                    </p>
                  )}
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">📋 Receta/Proceso:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {productoSeleccionado.receta}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-700">
                  <p className="font-semibold mb-1">💡 Consejos:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Sigue la receta al pie de la letra para consistencia</li>
                    <li>Revisa el estado de los ingredientes antes de comenzar</li>
                    <li>Comunica si algo no está disponible</li>
                    <li>Respeta los tiempos de cocción recomendados</li>
                  </ul>
                </div>

                <button
                  onClick={() => setProductoSeleccionado(null)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
                >
                  Volver
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
