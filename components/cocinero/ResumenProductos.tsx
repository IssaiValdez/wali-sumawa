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
    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-lg p-4">
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full text-left font-bold text-purple-700 flex justify-between items-center hover:opacity-75"
      >
        <span>📊 Resumen de Productos en Preparación</span>
        <span>{expandido ? '▼' : '▶'}</span>
      </button>

      {expandido && (
        <div className="mt-4 space-y-3">
          {productosOrdenados.map(producto => (
            <div key={producto.id} className="bg-white rounded p-3 border-l-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-purple-700">{producto.nombre}</h4>
                  <p className="text-sm text-gray-600">
                    Cantidad total: <span className="font-bold text-lg">{producto.cantidad}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    En pedidos: {producto.pedidos.join(', ')}
                  </p>
                </div>
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
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
