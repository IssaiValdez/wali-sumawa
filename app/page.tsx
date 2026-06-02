import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <main className="w-full max-w-2xl">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 mb-8 shadow-2xl text-center">
          <h1 className="text-5xl font-bold text-white mb-3">🍳 Wali Sumawa</h1>
          <p className="text-xl text-orange-100 mb-2">Sistema de Gestión de Kiosco de Comidas</p>
          <p className="text-orange-50">Administra pedidos, productos y entregas de forma eficiente</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">🍳 Panel del Cocinero</h2>
              <p className="text-orange-100">Visualiza, gestiona y prepara pedidos en tiempo real</p>
            </div>
            <div className="p-6">
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-center gap-2">✓ Visualizar pedidos pendientes y en preparación</li>
                <li className="flex items-center gap-2">✓ Notificaciones sonoras y visuales</li>
                <li className="flex items-center gap-2">✓ Gestionar productos agotados</li>
                <li className="flex items-center gap-2">✓ Ver recetas y procesos</li>
                <li className="flex items-center gap-2">✓ Asignar tiempos estimados</li>
                <li className="flex items-center gap-2">✓ Control de cocina saturada</li>
              </ul>
              <Link
                href="/cocinero"
                className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg text-center hover:from-red-700 hover:to-orange-700 transition"
              >
                Ir al Panel del Cocinero →
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">📱 Módulos Disponibles</h3>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• Panel Principal - Gestión de pedidos</li>
              <li>• Historial - Consulta entregas realizadas</li>
              <li>• Resumen - Análisis de productos en preparación</li>
              <li>• Recetas - Acceso a instrucciones de preparación</li>
              <li>• Configuración - Ajustes y alertas</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>🔧 Sistema en desarrollo - Rama: <span className="font-mono bg-slate-700 px-2 py-1 rounded">Cocinero</span></p>
        </div>
      </main>
    </div>
  );
}
