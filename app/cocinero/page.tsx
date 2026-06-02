'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCocinero } from '@/lib/cocinero/context';
import { ListaPedidosPendientes } from '@/components/cocinero/ListaPedidosPendientes';

export default function PanelCocinero() {
  const { pedidos, agregarPedido } = useCocinero();
  const [mostrarSimulador, setMostrarSimulador] = useState(false);

  const pedidosPendientes = pedidos.filter(
    p => p.estado === 'pendiente' || p.estado === 'preparando'
  ).length;
  const pedidosEntregados = pedidos.filter(p => p.estado === 'entregado').length;

  // Simulador de nuevos pedidos (para testing)
  const agregarPedidoSimulado = () => {
    const productos = [
      { productoId: '1', nombre: 'Hamburguesa Clásica', cantidad: 1, notas: '' },
      { productoId: '2', nombre: 'Papas Fritas', cantidad: 2, notas: 'Sin sal' },
      { productoId: '3', nombre: 'Sándwich de Pollo', cantidad: 1, notas: 'Sin tomate' },
      { productoId: '4', nombre: 'Ensalada César', cantidad: 1, notas: '' },
      { productoId: '5', nombre: 'Pizza Margarita', cantidad: 1, notas: 'Extra queso' },
    ];

    const itemsAleatorios = [];
    const cantidadItems = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < cantidadItems; i++) {
      const producto = productos[Math.floor(Math.random() * productos.length)];
      itemsAleatorios.push(producto);
    }

    agregarPedido(itemsAleatorios);
  };

  return (
    <div className="space-y-6">
      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">⏳ Pendientes</p>
          <p className="text-4xl font-bold">{pedidosPendientes}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">✅ Entregados</p>
          <p className="text-4xl font-bold">{pedidosEntregados}</p>
        </div>
      </div>

      {/* Botón de Simulador */}
      <div className="space-y-2">
        <button
          onClick={() => setMostrarSimulador(!mostrarSimulador)}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition"
        >
          {mostrarSimulador ? '✖️ Cerrar Simulador' : '➕ Simular Nuevo Pedido'}
        </button>

        {mostrarSimulador && (
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-blue-700">
              Genera pedidos de ejemplo para probar el sistema:
            </p>
            <button
              onClick={agregarPedidoSimulado}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
            >
              🎲 Generar Pedido Aleatorio
            </button>
            <button
              onClick={() => {
                agregarPedido([
                  { productoId: '1', nombre: 'Hamburguesa Clásica', cantidad: 2, notas: 'Sin cebolla' },
                  { productoId: '2', nombre: 'Papas Fritas', cantidad: 2, notas: '' },
                ]);
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
            >
              🍔 Hamburguesas x2
            </button>
            <button
              onClick={() => {
                agregarPedido([
                  { productoId: '3', nombre: 'Sándwich de Pollo', cantidad: 1, notas: 'Sin mayo' },
                  { productoId: '4', nombre: 'Ensalada César', cantidad: 1, notas: 'Aderezo aparte' },
                ]);
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
            >
              🥗 Sándwich + Ensalada
            </button>
          </div>
        )}
      </div>

      {/* Lista de Pedidos */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Pedidos</h2>
        <ListaPedidosPendientes />
      </div>

      {/* Links de Navegación */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/cocinero/historial"
          className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold text-center hover:from-purple-700 hover:to-purple-800 transition"
        >
          📜 Historial
        </Link>
        <Link
          href="/cocinero/resumen"
          className="block px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-bold text-center hover:from-indigo-700 hover:to-indigo-800 transition"
        >
          📊 Resumen
        </Link>
      </div>
    </div>
  );
}
