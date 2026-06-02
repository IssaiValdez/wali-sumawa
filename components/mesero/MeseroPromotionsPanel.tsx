import type { Promotion } from "@/components/mesero/types";

interface MeseroPromotionsPanelProps {
  promotions: Promotion[];
  onOpenPromotion: (promoId?: string | null) => void;
  onDisablePromotion: (promoId: string) => void;
}

export function MeseroPromotionsPanel({ promotions, onOpenPromotion, onDisablePromotion }: MeseroPromotionsPanelProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Promociones</p>
          <h2 className="text-2xl font-semibold text-slate-950">Administración</h2>
        </div>
        <button
          type="button"
          onClick={() => onOpenPromotion(null)}
          className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Crear promoción
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {promotions.map((promo) => (
          <div key={promo.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{promo.title}</p>
                <p className="text-sm text-slate-500">Descuento: {promo.discount}%</p>
              </div>
              <div className="text-right">
                <p className={`rounded-full px-3 py-1 text-xs font-semibold ${promo.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>
                  {promo.active ? "Activa" : "Inactiva"}
                </p>
                <p className="mt-1 text-xs text-slate-500">{promo.expiresAt}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenPromotion(promo.id)}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Editar
              </button>
              {promo.active ? (
                <button
                  type="button"
                  onClick={() => onDisablePromotion(promo.id)}
                  className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100"
                >
                  Desactivar
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
