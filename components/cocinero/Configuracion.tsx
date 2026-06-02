'use client';

import { useCocinero } from '@/lib/cocinero/context';

interface ConfiguracionProps {
  mostrarModal: boolean;
  onToggleModal: () => void;
}

export function Configuracion({ mostrarModal, onToggleModal }: ConfiguracionProps) {
  return (
    <button
      onClick={onToggleModal}
      className="w-full bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white font-bold py-4 px-5 rounded-xl hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
    >
      ⚙️ Configuración
    </button>
  );
}
