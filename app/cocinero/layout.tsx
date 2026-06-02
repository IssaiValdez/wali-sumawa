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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-6 mb-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">🍳 Panel del Cocinero</h1>
                <p className="text-orange-100">Kiosco de Comidas Rápidas</p>
              </div>
              <Link
                href="/"
                className="px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                ← Volver
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar de Controles */}
            <div className="lg:col-span-1 space-y-3 h-fit sticky top-6">
              <ControlProductos />
              <VisorRecetas />
              <Configuracion />
              
              {!notificacionesPermitidas && (
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-yellow-700">⚠️ Notificaciones desactivadas</p>
                  <p className="text-yellow-600">Habilita las notificaciones en tu navegador para alertas</p>
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
