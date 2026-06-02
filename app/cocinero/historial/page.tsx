'use client';

import Link from 'next/link';
import { HistorialPedidos } from '@/components/cocinero/HistorialPedidos';

export default function HistorialPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">📜 Historial de Entregas</h1>
        <Link
          href="/cocinero"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
        >
          ← Volver al Panel
        </Link>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        <HistorialPedidos />
      </div>
    </div>
  );
}
