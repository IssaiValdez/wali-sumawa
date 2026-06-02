'use client';

import { useCocinero } from '@/lib/cocinero/context';

interface ControlProductosProps {
  mostrarModal: boolean;
  onToggleModal: () => void;
}

export function ControlProductos({ mostrarModal, onToggleModal }: ControlProductosProps) {
  const { productos } = useCocinero();
  const productosAgotados = productos.filter(p => p.agotado);

  return (
    <button
      onClick={onToggleModal}
      className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 text-white font-bold py-4 px-5 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-rose-700 transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
    >
      <span className="flex items-center gap-2">
        📦 Gestionar Productos
      </span>
      <span className="bg-black bg-opacity-30 rounded-full px-3 py-1 text-sm font-bold">
        {productosAgotados.length}/{productos.length}
      </span>
    </button>
  );
}
