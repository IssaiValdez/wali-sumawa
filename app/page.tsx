export default function Home() {
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
        <h2 className="font-bold">Método de Pago</h2>

        <div className="flex gap-4 mt-3">
          <button className="border px-4 py-2">
            Efectivo
          </button>

          <button className="border px-4 py-2">
            QR
          </button>
        </div>
      </div>

      <button className="bg-red-400 text-white px-4 py-2 rounded">
        Procesar Pago y Generar Comprobante
      </button>
    </main>
  );
}