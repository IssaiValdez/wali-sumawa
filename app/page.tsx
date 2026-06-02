"use client";

import { useState } from "react";

export default function Home() {
  // Estado para controlar qué mesa se visualiza en el detalle (por defecto Mesa 3)
  const [mesaSeleccionada, setMesaSeleccionada] = useState("Mesa 3");
  const [metodoPago, setMetodoPago] = useState("");
  // Estado para abrir/cerrar el menú lateral en móviles
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C1810] font-sans flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* ================= 1. ENCABEZADO / BARRA LATERAL (RESPONSIVO) ================= */}
      {/* Navbar superior para Celulares */}
      <header className="lg:hidden bg-[#7A2816] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#591C0E] flex items-center justify-center font-bold text-xs tracking-wider">
            WS
          </div>
          <div>
            <h1 className="font-bold text-sm">Wali Sumawa</h1>
            <p className="text-[10px] text-[#E6C5BD]">Kiosko Tradicional</p>
          </div>
        </div>
        <button 
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="p-2 bg-[#591C0E] rounded-lg text-sm font-semibold focus:outline-none"
        >
          {menuAbierto ? "✕ Cerrar" : "☰ Menú"}
        </button>
      </header>

      {/* Menú Lateral (Se oculta en cel de forma nativa y se despliega, fijo en pantallas grandes) */}
      <section className={`${
        menuAbierto ? "block" : "hidden"
      } lg:flex w-full lg:w-64 bg-[#7A2816] text-white flex-col justify-between p-4 flex-shrink-0 border-b lg:border-b-0 border-[#923C29] lg:min-h-screen`}>
        <div>
          {/* Logo oculto en celular porque ya está en el header superior */}
          <div className="hidden lg:flex items-center justify-between border-b border-[#923C29] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#591C0E] flex items-center justify-center font-bold text-sm tracking-wider">
                WS
              </div>
              <div>
                <h1 className="font-bold text-sm leading-tight">Wali Sumawa</h1>
                <p className="text-xs text-[#E6C5BD]">Kiosko Tradicional</p>
              </div>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className="space-y-1">
            <button 
              onClick={() => setMenuAbierto(false)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#591C0E] rounded-xl text-left font-medium text-sm shadow-inner transition-all"
            >
              <span className="text-base">💳</span> Caja
            </button>
          </nav>
        </div>

        {/* Información del Usuario en Sesión */}
        <div className="border-t border-[#923C29] pt-4 mt-6 lg:mt-0">
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

      {/* ================= 2. CONTENIDO PRINCIPAL (APILADO EN CELULAR) ================= */}
      <section className="flex-1 flex flex-col p-4 md:p-6 space-y-6 overflow-y-auto">
        
        {/* Contenedor adaptativo: 1 columna en celular, 12 columnas en PC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* SECCIÓN: Pedidos por Cobrar */}
          <div className="lg:col-span-4 bg-white p-4 md:p-5 rounded-2xl border border-[#EDE8E0] shadow-sm">
            <h2 className="font-serif font-bold text-base md:text-lg text-[#4A2312] mb-3">Pedidos por Cobrar</h2>
            
            {/* Contenedor horizontal con scroll en cel, vertical en PC */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              
              {/* Tarjeta de Mesa 3 */}
              <div 
                onClick={() => setMesaSeleccionada("Mesa 3")}
                className={`p-3 md:p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center min-w-[140px] sm:min-w-0 flex-shrink-0 lg:flex-shrink w-auto lg:w-full ${
                  mesaSeleccionada === "Mesa 3" 
                    ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816]" 
                    : "border-[#EDE8E0] hover:bg-gray-50"
                }`}
              >
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-[#2C1810]">Mesa 3</h3>
                  <p className="text-[10px] md:text-xs text-gray-400">2 items</p>
                </div>
                <span className="font-bold text-sm md:text-base text-[#7A2816] mt-1 sm:mt-0">Bs. 40</span>
              </div>

              {/* Tarjeta de Mesa 7 */}
              <div 
                onClick={() => setMesaSeleccionada("Mesa 7")}
                className={`p-3 md:p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center min-w-[140px] sm:min-w-0 flex-shrink-0 lg:flex-shrink w-auto lg:w-full ${
                  mesaSeleccionada === "Mesa 7" 
                    ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816]" 
                    : "border-[#EDE8E0] hover:bg-gray-50"
                }`}
              >
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-[#2C1810]">Mesa 7</h3>
                  <p className="text-[10px] md:text-xs text-gray-400">1 items</p>
                </div>
                <span className="font-bold text-sm md:text-base text-[#7A2816] mt-1 sm:mt-0">Bs. 60</span>
              </div>

            </div>
          </div>

          {/* SECCIÓN: Detalle del Pedido */}
          <div className="lg:col-span-8 bg-white p-4 md:p-6 rounded-2xl border border-[#EDE8E0] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif font-bold text-base md:text-lg text-[#4A2312]">Detalle del Pedido</h2>
              <button className="flex items-center gap-1.5 border border-[#7A2816] text-[#7A2816] px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#FDF6F4] transition-colors">
                <span>🖨️</span> <span className="hidden sm:inline">Imprimir</span>
              </button>
            </div>

            <h3 className="font-bold text-sm md:text-base mb-3 text-[#2C1810]">{mesaSeleccionada}</h3>

            {/* Listado de items */}
            <div className="space-y-3 border-b border-[#EDE8E0] pb-3 mb-4">
              {mesaSeleccionada === "Mesa 3" ? (
                <>
                  <div className="flex justify-between text-xs md:text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Silpancho</p>
                      <p className="text-[10px] text-gray-400">Bs. 15 x 2</p>
                    </div>
                    <span className="font-semibold text-gray-800">Bs. 30</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <div>
                      <p className="font-medium text-gray-800">Api Morado</p>
                      <p className="text-[10px] text-gray-400">Bs. 5 x 2</p>
                    </div>
                    <span className="font-semibold text-gray-800">Bs. 10</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-xs md:text-sm">
                  <div>
                    <p className="font-medium text-gray-800">Pique Macho</p>
                    <p className="text-[10px] text-gray-400">Bs. 60 x 1</p>
                  </div>
                  <span className="font-semibold text-gray-800">Bs. 60</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-[#FAF7F2] px-3 py-2.5 rounded-xl mb-4 border border-[#EDE8E0]">
              <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider text-[#4A2312]">TOTAL:</span>
              <span className="font-bold text-lg md:text-xl text-[#7A2816]">
                Bs. {mesaSeleccionada === "Mesa 3" ? "40" : "60"}
              </span>
            </div>

            {/* Métodos de Pago */}
            <div className="mb-5">
              <p className="text-[11px] font-semibold text-gray-500 mb-2">Método de Pago</p>
              <div className="grid grid-cols-2 gap-3">
                
                {/* Botón Efectivo */}
                <button
                  type="button"
                  onClick={() => setMetodoPago("Efectivo")}
                  className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    metodoPago === "Efectivo"
                      ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816] text-[#7A2816]"
                      : "border-[#EDE8E0] text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl text-emerald-700 font-bold">$</span>
                  <span className="text-[11px] font-semibold">Efectivo</span>
                </button>

                {/* Botón QR */}
                <button
                  type="button"
                  onClick={() => setMetodoPago("QR")}
                  className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    metodoPago === "QR"
                      ? "border-[#7A2816] bg-[#FDF6F4] ring-1 ring-[#7A2816] text-[#7A2816]"
                      : "border-[#EDE8E0] text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg tracking-tighter text-[#7A2816] font-mono font-bold">▣▣</span>
                  <span className="text-[11px] font-semibold">QR</span>
                </button>
              </div>
            </div>

            {/* Botón Procesar Pago */}
            <button className="w-full py-3 bg-[#C59B8E] hover:bg-[#B68A7C] text-white font-bold text-xs md:text-sm rounded-xl transition-colors shadow-sm tracking-wide">
              💵 Procesar Pago y Generar Comprobante
            </button>
          </div>
        </div>

        {/* ================= 3. RESUMEN DE CAJA DEL DÍA ================= */}
        <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#EDE8E0] shadow-sm">
          <h2 className="font-serif font-bold text-sm md:text-base text-[#4A2312] mb-3">Resumen de Caja del Día</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#EDE8E0]">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Efectivo</p>
              <p className="text-sm md:text-base font-bold text-gray-800 mt-0.5">Bs. 850</p>
            </div>

            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#EDE8E0]">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">QR</p>
              <p className="text-sm md:text-base font-bold text-gray-800 mt-0.5">Bs. 570</p>
            </div>

            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#EDE8E0]">
              <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">Ventas</p>
              <p className="text-base font-bold text-emerald-700 mt-0.5">Bs. 1420</p>
            </div>

            <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[#EDE8E0]">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Transac.</p>
              <p className="text-sm md:text-base font-bold text-gray-800 mt-0.5">32</p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}