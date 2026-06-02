'use client';

import { useCocinero } from '@/lib/cocinero/context';

interface VisorRecetasProps {
  mostrarModal: boolean;
  onToggleModal: () => void;
}

export function VisorRecetas({ mostrarModal, onToggleModal }: VisorRecetasProps) {
  return (
    <button
      onClick={onToggleModal}
      className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold py-4 px-5 rounded-xl hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
    >
      📖 Recetas y Procesos
    </button>
  );
}
