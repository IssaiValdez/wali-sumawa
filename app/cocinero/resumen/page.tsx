'use client';

import Link from 'next/link';
import { useCocinero } from '@/lib/cocinero/context';
import { calcularResumenProductos } from '@/lib/cocinero/utils';

export default function ResumenPage() {
  const { pedidos } = useCocinero();
  const resumenProductos = calcularResumenProductos(pedidos);

  const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente' || p.estado === 'preparando');
  const tiempoTotalEstimado = pedidosPendientes.reduce(
    (acc, p) => acc + (p.tiempoEstimado || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">📊 Resumen de Productos</h1>
        <Link
          href="/cocinero"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
        >
          ← Volver al Panel
        </Link>
      </div>

      {/* Tarjetas de Información */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">🍲 Total Pendientes</p>
          <p className="text-4xl font-bold">{pedidosPendientes.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">⏱️ Tiempo Total</p>
          <p className="text-4xl font-bold">{tiempoTotalEstimado}</p>
          <p className="text-sm">minutos</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">📦 Productos Únicos</p>
          <p className="text-4xl font-bold">{resumenProductos.length}</p>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg p-6 shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Desglose de Productos en Preparación</h2>
        
        {resumenProductos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">✅ Sin productos en preparación</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resumenProductos.map(producto => (
              <div
                key={producto.productoId}
                className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{producto.nombre}</h3>
                  <p className="text-sm text-gray-600">
                    En {producto.pedidosConProducto.length} pedido(s): {producto.pedidosConProducto.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-purple-600">{producto.cantidadTotal}</p>
                  <p className="text-xs text-gray-600">unidades</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consejos de Optimización */}
      <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-6">
        <h3 className="font-bold text-yellow-800 text-lg mb-3">💡 Optimización</h3>
        <ul className="space-y-2 text-yellow-700">
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Prepara primero los productos con mayor cantidad para optimizar tiempo</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Agrupa productos similares para usar eficientemente la cocina</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Asigna tiempos estimados para que los cajeros comuniquen a clientes</span>
          </li>
          <li className="flex items-start gap-2">
            <span>✓</span>
            <span>Si están saturados, activa el estado "Cocina Saturada" en configuración</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
