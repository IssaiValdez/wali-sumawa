import type { Dish } from "@/components/mesero/types";

interface MeseroProductsPanelProps {
  dishes: Dish[];
  onToggleAvailability: (dishId: string) => void;
}

export function MeseroProductsPanel({ dishes, onToggleAvailability }: MeseroProductsPanelProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Platos disponibles</p>
          <h2 className="text-2xl font-semibold text-slate-950">Gestión de carta</h2>
        </div>
        <p className="text-sm text-slate-600">Marca cada plato como disponible o agotado y revisa stock en tiempo real.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {dishes.map((dish) => (
          <div key={dish.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-slate-950">{dish.name}</p>
                <p className="text-sm text-slate-600">{dish.category}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${dish.available ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                {dish.available ? "Disponible" : "Agotado"}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-700">
              <span>Cantidad: {dish.stock}</span>
              <span>Bs. {dish.price}</span>
            </div>
            <button
              type="button"
              onClick={() => onToggleAvailability(dish.id)}
              className={`mt-4 w-full rounded-3xl px-4 py-3 text-sm font-semibold transition ${dish.available ? "bg-rose-50 text-rose-800 hover:bg-rose-100" : "bg-emerald-950 text-white hover:bg-emerald-800"}`}
            >
              {dish.available ? "Marcar agotado" : "Marcar disponible"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
