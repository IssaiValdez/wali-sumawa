"use client";

import { useState } from "react";

export default function Home() {
  // Estado para controlar qué mesa se visualiza en el detalle (por defecto Mesa 3 como en la imagen)
  const [mesaSeleccionada, setMesaSeleccionada] = useState("Mesa 3");
  const [metodoPago, setMetodoPago] = useState("");

  return (
    <main className="flex h-screen bg-[#FDFBF7] text-[#2C1810] font-sans overflow-hidden">
      
      {/* ================= 1. BARRA LATERAL (SIDEBAR) ================= */}
      <section className="w-64 bg-[#7A2816] text-white flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          {/* Encabezado del Negocio */}
          <div className="flex items-center justify-between border-b border-[#923C29] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#591C0E] flex items-center justify-center font-bold text-sm tracking-wider">
                WS
              </div>
              <div>
                <h1 className="font-bold text-sm leading-tight">Wali Sumawa</h1>
                <p className="text-xs text-[#E6C5BD]">Kiosko Tradicional</p>
              </div>
            </div>
            <button className="text-[#E6C5BD] hover:text-white text-xs transition-colors">✕</button>
          </div>

          {/* Menú de Navegación */}
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#591C0E] rounded-xl text-left font-medium text-sm shadow-inner transition-all">
              <span className="text-base">💳</span> Caja
            </button>
          </nav>
        </div>

        {/* Información del Usuario en Sesión */}
        <div className="border-t border-[#923C29] pt-4">
          <div className="text-xs mb-4">
            <p className="text-[#E6C5BD] mb-0.5">Usuario:</p>
            <p className="font-bold text-white text-sm">Paola Mancilla</p>
            <p className="text-[10px] text-[#E6C5BD] font-medium uppercase tracking-wider">Cajero</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#591C0E]/50 hover:bg-[#591C0E] text-[#E6C5BD] hover:text-white rounded-xl text-xs font-semibold transition-all">
            <span>➔</span> Cerrar Sesión
          </button>
        </div>
      </section>

      {/* ================= 2. CONTENIDO PRINCIPAL ================= */}
      <section className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
        
        {/* Fila de Contenido Superior: Pedidos y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* SECCIÓN: Pedidos por Cobrar (Ocupa 4 de 12 columnas) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-[#EDE8E0] shadow-sm">
            <h2 className="font-serif font-bold text-lg text-[#4A2312] mb-4">Pedidos por Cobrar</h2>
            <div className="space-y-3">
              
              {/* Tarjeta de Mesa 3 */}
              <div 
                onClick={() => setMesaSeleccionada("Mesa 3")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  mesaSeleccionada === "Mesa 3" 
                    ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816]" 
                    : "border-[#EDE8E0] hover:bg-gray-50"
                }`}
              >
                <div>
                  <h3 className="font-bold text-sm text-[#2C1810]">Mesa 3</h3>
                  <p className="text-xs text-gray-400 mt-0.5">2 items</p>
                </div>
                <span className="font-bold text-base text-[#7A2816]">Bs. 40</span>
              </div>

              {/* Tarjeta de Mesa 7 */}
              <div 
                onClick={() => setMesaSeleccionada("Mesa 7")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  mesaSeleccionada === "Mesa 7" 
                    ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816]" 
                    : "border-[#EDE8E0] hover:bg-gray-50"
                }`}
              >
                <div>
                  <h3 className="font-bold text-sm text-[#2C1810]">Mesa 7</h3>
                  <p className="text-xs text-gray-400 mt-0.5">1 items</p>
                </div>
                <span className="font-bold text-base text-[#7A2816]">Bs. 60</span>
              </div>

            </div>
          </div>

          {/* SECCIÓN: Detalle del Pedido (Ocupa 8 de 12 columnas) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#EDE8E0] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif font-bold text-lg text-[#4A2312]">Detalle del Pedido</h2>
              <button className="flex items-center gap-1.5 border border-[#7A2816] text-[#7A2816] px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#FDF6F4] transition-colors">
                <span>🖨️</span> Imprimir
              </button>
            </div>

            <h3 className="font-bold text-base mb-4 text-[#2C1810]">{mesaSeleccionada}</h3>

            {/* Listado de items dinámicos según la mesa seleccionada */}
            <div className="space-y-4 border-b border-[#EDE8E0] pb-4 mb-4">
              {mesaSeleccionada === "Mesa 3" ? (
                <>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Silpancho</p>
                      <p className="text-xs text-gray-400 mt-0.5">Bs. 15 x 2</p>
                    </div>
                    <span className="font-semibold text-gray-800">Bs. 30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Api Morado</p>
                      <p className="text-xs text-gray-400 mt-0.5">Bs. 5 x 2</p>
                    </div>
                    <span className="font-semibold text-gray-800">Bs. 10</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-800">Pique Macho</p>
                    <p className="text-xs text-gray-400 mt-0.5">Bs. 60 x 1</p>
                  </div>
                  <span className="font-semibold text-gray-800">Bs. 60</span>
                </div>
              )}
            </div>

            {/* Sección de Total */}
            <div className="flex justify-between items-center bg-[#FAF7F2] px-4 py-3 rounded-xl mb-6 border border-[#EDE8E0]">
              <span className="font-bold text-xs uppercase tracking-wider text-[#4A2312]">TOTAL:</span>
              <span className="font-bold text-xl text-[#7A2816]">
                Bs. {mesaSeleccionada === "Mesa 3" ? "40" : "60"}
              </span>
            </div>

            {/* Métodos de Pago */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-3">Método de Pago</p>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Botón Efectivo */}
                <button
                  type="button"
                  onClick={() => setMetodoPago("Efectivo")}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${
                    metodoPago === "Efectivo"
                      ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816] text-[#7A2816]"
                      : "border-[#EDE8E0] text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl text-emerald-700 font-bold">$</span>
                  <span className="text-xs font-semibold">Efectivo</span>
                </button>

                {/* Botón QR */}
                <button
                  type="button"
                  onClick={() => setMetodoPago("QR")}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${
                    metodoPago === "QR"
                      ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816] text-[#7A2816]"
                      : "border-[#EDE8E0] text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl tracking-tighter text-[#7A2816] font-mono font-bold">▣▣</span>
                  <span className="text-xs font-semibold">QR</span>
                </button>
              </div>
            </div>

            {/* Botón Procesar Pago */}
            <button className="w-full py-3.5 bg-[#C59B8E] hover:bg-[#B68A7C] text-white font-bold text-sm rounded-xl transition-colors shadow-sm tracking-wide">
              💵 Procesar Pago y Generar Comprobante
            </button>
          </div>
        </div>

        {/* ================= 3. RESUMEN DE CAJA DEL DÍA ================= */}
        <div className="bg-white p-5 rounded-2xl border border-[#EDE8E0] shadow-sm">
          <h2 className="font-serif font-bold text-base text-[#4A2312] mb-4">Resumen de Caja del Día</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#EDE8E0]">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Total Efectivo</p>
              <p className="text-lg font-bold text-gray-800 mt-1">Bs. 850</p>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#EDE8E0]">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Total QR</p>
              <p className="text-lg font-bold text-gray-800 mt-1">Bs. 570</p>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#EDE8E0]">
              <p className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wider">Total Ventas</p>
              <p className="text-xl font-bold text-emerald-700 mt-1">Bs. 1420</p>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#EDE8E0]">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Transacciones</p>
              <p className="text-lg font-bold text-gray-800 mt-1">32</p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}