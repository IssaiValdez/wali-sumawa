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
        <div className="bg-gradient-to-br from-red-500 via-orange-500 to-red-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-red-400">
          <p className="text-sm font-semibold opacity-90 mb-2">⏳ Pendientes</p>
          <p className="text-5xl font-black drop-shadow-lg">{pedidosPendientes}</p>
          <p className="text-xs opacity-75 mt-2">{pedidosPendientes === 1 ? 'pedido' : 'pedidos'} en preparación</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400">
          <p className="text-sm font-semibold opacity-90 mb-2">✅ Entregados</p>
          <p className="text-5xl font-black drop-shadow-lg">{pedidosEntregados}</p>
          <p className="text-xs opacity-75 mt-2">entregas completadas</p>
        </div>
      </div>

      {/* Botón de Simulador */}
      <div className="space-y-2">
        <button
          onClick={() => setMostrarSimulador(!mostrarSimulador)}
          className="w-full px-4 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-lg border-2 border-blue-400"
        >
          {mostrarSimulador ? '✖️ Cerrar Simulador' : '➕ Simular Nuevo Pedido'}
        </button>

        {mostrarSimulador && (
          <div className="bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-100 border-2 border-blue-400 rounded-xl p-5 space-y-3 shadow-lg">
            <p className="text-sm font-bold text-blue-900">
              🎲 Genera pedidos de ejemplo para probar el sistema:
            </p>
            <button
              onClick={agregarPedidoSimulado}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              🎲 Generar Aleatorio
            </button>
            <button
              onClick={() => {
                agregarPedido([
                  { productoId: '1', nombre: 'Hamburguesa Clásica', cantidad: 2, notas: 'Sin cebolla' },
                  { productoId: '2', nombre: 'Papas Fritas', cantidad: 2, notas: '' },
                ]);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
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
              className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              🥗 Sándwich + Ensalada
            </button>
          </div>
        )}
      </div>

      {/* Lista de Pedidos */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-6 shadow-xl border-2 border-gray-200">
        <h2 className="text-3xl font-black text-gray-800 mb-4 flex items-center gap-2">
          📋 Pedidos en Tiempo Real
          {pedidosPendientes > 0 && (
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full animate-pulse">{pedidosPendientes}</span>
          )}
        </h2>
        <ListaPedidosPendientes />
      </div>

      {/* Links de Navegación */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/cocinero/historial"
          className="block px-4 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-center hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-purple-400"
        >
          📜 Historial
        </Link>
        <Link
          href="/cocinero/resumen"
          className="block px-4 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold text-center hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-indigo-400"
        >
          📊 Resumen
        </Link>
      </div>
    </div>
  );
}
