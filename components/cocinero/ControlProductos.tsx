'use client';

import { useState } from 'react';
import { useCocinero } from '@/lib/cocinero/context';

export function ControlProductos() {
  const { productos, marcarProductoAgotado } = useCocinero();
  const [mostrarModal, setMostrarModal] = useState(false);

  const productosAgotados = productos.filter(p => p.agotado);
  const productosDisponibles = productos.filter(p => !p.agotado);

  return (
    <div>
      <button
        onClick={() => setMostrarModal(!mostrarModal)}
        className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-bold py-4 px-5 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-rose-700 transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      >
        <span className="flex items-center gap-2">
          📦 Gestionar Productos
        </span>
        <span className="bg-black bg-opacity-30 rounded-full px-3 py-1 text-sm font-bold">
          {productosAgotados.length}/{productos.length}
        </span>
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl border-2 border-orange-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">📦 Estado de Productos</h2>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Productos Disponibles */}
              <div>
                <h3 className="font-bold text-green-600 text-lg mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Disponibles ({productosDisponibles.length})
                </h3>
                <div className="space-y-2">
                  {productosDisponibles.map(producto => (
                    <div
                      key={producto.id}
                      className="flex items-center justify-between bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border-2 border-green-300 hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-green-800">{producto.nombre}</p>
                        <p className="text-xs text-green-600 line-clamp-1">{producto.receta}</p>
                      </div>
                      <button
                        onClick={() => marcarProductoAgotado(producto.id, true)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap ml-3"
                      >
                        🚫 Agotar
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productos Agotados */}
              {productosAgotados.length > 0 && (
                <div className="border-t-2 border-gray-300 pt-6">
                  <h3 className="font-bold text-red-600 text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">❌</span> Agotados ({productosAgotados.length})
                  </h3>
                  <div className="space-y-2">
                    {productosAgotados.map(producto => (
                      <div
                        key={producto.id}
                        className="flex items-center justify-between bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-xl border-2 border-red-300 hover:shadow-md transition-all opacity-80"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-red-800 line-through">{producto.nombre}</p>
                          <p className="text-xs text-red-600 line-clamp-1">{producto.receta}</p>
                        </div>
                        <button
                          onClick={() => marcarProductoAgotado(producto.id, false)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap ml-3"
                        >
                          ✅ Disponible
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMostrarModal(false)}
              className="w-full mt-6 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
