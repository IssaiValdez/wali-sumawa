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
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center justify-between"
      >
        <span>📦 Gestionar Productos Agotados</span>
        <span className="bg-black bg-opacity-30 rounded-full px-2 py-1 text-sm">
          {productosAgotados.length} agotados
        </span>
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Gestionar Productos</h2>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-green-600 text-lg mb-3">✅ Disponibles ({productosDisponibles.length})</h3>
                <div className="space-y-2">
                  {productosDisponibles.map(producto => (
                    <div key={producto.id} className="flex items-center justify-between bg-green-50 p-3 rounded border border-green-200">
                      <div>
                        <p className="font-semibold">{producto.nombre}</p>
                        <p className="text-sm text-gray-600">{producto.receta}</p>
                      </div>
                      <button
                        onClick={() => marcarProductoAgotado(producto.id, true)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-semibold whitespace-nowrap"
                      >
                        Marcar Agotado
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {productosAgotados.length > 0 && (
                <div>
                  <h3 className="font-bold text-red-600 text-lg mb-3">❌ Agotados ({productosAgotados.length})</h3>
                  <div className="space-y-2">
                    {productosAgotados.map(producto => (
                      <div key={producto.id} className="flex items-center justify-between bg-red-50 p-3 rounded border border-red-200">
                        <div>
                          <p className="font-semibold line-through">{producto.nombre}</p>
                          <p className="text-sm text-gray-600">{producto.receta}</p>
                        </div>
                        <button
                          onClick={() => marcarProductoAgotado(producto.id, false)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold whitespace-nowrap"
                        >
                          Disponible
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
