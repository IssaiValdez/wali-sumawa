import { useMemo, useState } from "react";
import type { Dish } from "@/components/mesero/types";

interface MeseroTableOrderFormProps {
  dishes: Dish[];
  onSubmit: (payload: { table: string; customer: string; products: Array<{ id: string; name: string; qty: number }> }) => void;
}

export function MeseroTableOrderForm({ dishes, onSubmit }: MeseroTableOrderFormProps) {
  const [table, setTable] = useState("");
  const [customer, setCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(dishes[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<Array<{ id: string; name: string; qty: number }>>([]);

  const selectedDishName = useMemo(
    () => dishes.find((dish) => dish.id === selectedProduct)?.name ?? "",
    [dishes, selectedProduct],
  );

  const canSubmit = table.trim().length > 0 && customer.trim().length > 0 && items.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pedido en mesa</p>
          <h2 className="text-2xl font-semibold text-slate-950">Registrar pedido</h2>
        </div>
        <p className="text-sm text-slate-600">Crea pedidos de mesa con productos, cantidades y origen etiquetado.</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Mesa
            <input
              type="text"
              value={table}
              onChange={(event) => setTable(event.target.value)}
              placeholder="Ej. Mesa 4"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Cliente
            <input
              type="text"
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              placeholder="Ej. Carla Gómez"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
          <label className="block text-sm font-medium text-slate-700">
            Producto
            <select
              value={selectedProduct}
              onChange={(event) => setSelectedProduct(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            >
              {dishes.map((dish) => (
                <option key={dish.id} value={dish.id}>
                  {dish.name} {dish.available ? "" : "(agotado)"}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Cantidad
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!selectedDishName || quantity < 1}
            onClick={() => {
              if (!selectedDishName || quantity < 1) return;
              setItems((prev) => [
                ...prev,
                {
                  id: selectedProduct,
                  name: selectedDishName,
                  qty: quantity,
                },
              ]);
              setQuantity(1);
            }}
            className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Agregar producto
          </button>
          <p className="text-sm text-slate-600">Productos añadidos: {items.length}</p>
        </div>

        {items.length > 0 ? (
          <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Resumen</p>
            <ul className="space-y-2 text-sm text-slate-700">
              {items.map((item, index) => (
                <li key={`${item.id}-${index}`} className="flex items-center justify-between rounded-3xl bg-white px-4 py-3">
                  <span>{item.name}</span>
                  <span className="font-medium text-slate-900">x{item.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => {
            onSubmit({ table, customer, products: items });
            setTable("");
            setCustomer("");
            setItems([]);
          }}
          className="mt-4 inline-flex items-center justify-center rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Registrar pedido de mesa
        </button>
      </div>
    </div>
  );
}
