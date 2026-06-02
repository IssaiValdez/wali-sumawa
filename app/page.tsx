"use client";

import { useState } from "react";

export default function Home() {
  const [metodoPago, setMetodoPago] = useState("");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Caja - Wali Sumawa
      </h1>

      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold">Pedidos por Cobrar</h2>

        <div className="mt-3 border p-3 rounded">
          <p>Mesa 3</p>
          <p>Bs. 40</p>
        </div>

        <div className="mt-3 border p-3 rounded">
          <p>Mesa 7</p>
          <p>Bs. 60</p>
        </div>
      </div>

      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold">Detalle del Pedido</h2>

        <p>Mesa 7</p>
        <p>Pique Macho</p>
        <p>Total: Bs. 60</p>
      </div>

      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold mb-3">Método de Pago</h2>

        <div className="flex gap-4">
          <button
            onClick={() => setMetodoPago("Efectivo")}
            className={`px-4 py-2 border rounded ${
              metodoPago === "Efectivo"
                ? "bg-green-500 text-white"
                : ""
            }`}
          >
            Efectivo
          </button>

          <button
            onClick={() => setMetodoPago("QR")}
            className={`px-4 py-2 border rounded ${
              metodoPago === "QR"
                ? "bg-red-500 text-white"
                : ""
            }`}
          >
            QR
          </button>
        </div>

        {metodoPago && (
          <p className="mt-3">
            Método seleccionado: {metodoPago}
          </p>
        )}
      </div>

      <button className="bg-red-400 text-white px-4 py-2 rounded">
        Procesar Pago y Generar Comprobante
      </button>
    </main>
  );
}