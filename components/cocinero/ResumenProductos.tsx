'use client';

import { useState } from 'react';
import { useCocinero } from '@/lib/cocinero/context';

export function ResumenProductos() {
  const { pedidos } = useCocinero();
  const [expandido, setExpandido] = useState(true);

  const resumen = pedidos
    .filter(p => p.estado === 'pendiente' || p.estado === 'preparando')
    .reduce(
      (acc, pedido) => {
        pedido.items.forEach(item => {
          const clave = item.productoId;
          if (!acc[clave]) {
            acc[clave] = { nombre: item.nombre, cantidad: 0, pedidos: [] };
          }
          acc[clave].cantidad += item.cantidad;
          if (!acc[clave].pedidos.includes(pedido.numero)) {
            acc[clave].pedidos.push(pedido.numero);
          }
        });
        return acc;
      },
      {} as { [key: string]: { nombre: string; cantidad: number; pedidos: number[] } }
    );

  const productosOrdenados = Object.entries(resumen)
    .sort((a, b) => b[1].cantidad - a[1].cantidad)
    .map(([id, data]) => ({ id, ...data }));

  if (productosOrdenados.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 border-2 border-purple-400 rounded-2xl p-6 shadow-xl mb-6 hover:shadow-2xl transition-all duration-300">
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full text-left font-bold text-purple-800 flex justify-between items-center hover:opacity-80 transition-opacity active:scale-95 transform duration-200"
      >
        <span className="flex items-center gap-2 text-lg">
          📊 Resumen de Productos
          <span className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full">{productosOrdenados.length}</span>
        </span>
        <span className="text-2xl">{expandido ? '▼' : '▶'}</span>
      </button>

      {expandido && (
        <div className="mt-4 space-y-3 animation-slideDown">
          {productosOrdenados.map((producto, idx) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl p-4 border-2 border-purple-300 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 transform"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-purple-800">{producto.nombre}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Total:</span> <span className="text-lg font-bold text-purple-700">{producto.cantidad} unidades</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold">En pedidos:</span> {producto.pedidos.join(', ')}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl shadow-lg flex-shrink-0">
                  {producto.cantidad}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
