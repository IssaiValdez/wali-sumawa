'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CocineroProvider } from '@/lib/cocinero/context';
import { ResumenProductos } from '@/components/cocinero/ResumenProductos';
import { ControlProductos } from '@/components/cocinero/ControlProductos';
import { Configuracion } from '@/components/cocinero/Configuracion';
import { VisorRecetas } from '@/components/cocinero/VisorRecetas';

export default function CocinerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notificacionesPermitidas, setNotificacionesPermitidas] = useState(false);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      setNotificacionesPermitidas(true);
    }
  }, []);

  return (
    <CocineroProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 rounded-2xl p-6 mb-6 shadow-2xl border-2 border-orange-400 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="text-white">
                <h1 className="text-5xl font-black mb-2 drop-shadow-lg">🍳 Panel del Cocinero</h1>
                <p className="text-xl font-semibold text-orange-50 drop-shadow-md">Kiosco de Comidas Rápidas</p>
                <p className="text-sm text-orange-100 mt-1">⭐ Sistema de Gestión en Tiempo Real</p>
              </div>
              <Link
                href="/"
                className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ← Volver al Inicio
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar de Controles */}
            <div className="lg:col-span-1 space-y-3 h-fit sticky top-6">
              <style>{`
                @keyframes slideDown {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .animation-slideDown {
                  animation: slideDown 0.3s ease-out;
                }
              `}</style>
              
              <ControlProductos />
              <VisorRecetas />
              <Configuracion />
              
              {!notificacionesPermitidas && (
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-xl p-4 text-sm shadow-md hover:shadow-lg transition-all">
                  <p className="font-bold text-yellow-800">⚠️ Notificaciones Desactivadas</p>
                  <p className="text-yellow-700 text-xs mt-1">Habilita las notificaciones en tu navegador para recibir alertas de nuevas comandas</p>
                </div>
              )}
            </div>

            {/* Contenido Principal */}
            <div className="lg:col-span-3">
              <ResumenProductos />
              <div className="mt-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CocineroProvider>
  );
}
