import type { Payment } from "@/components/mesero/types";

interface MeseroPaymentsPanelProps {
  payments: Payment[];
  onConfirmPayment: (paymentId: string) => void;
}

export function MeseroPaymentsPanel({ payments, onConfirmPayment }: MeseroPaymentsPanelProps) {
  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pagos pendientes</p>
          <h2 className="text-2xl font-semibold text-slate-950">Confirmación de cobros</h2>
        </div>
        <p className="text-sm text-slate-600">Revisa pagos pendientes y actualiza el estado de los pedidos automáticamente.</p>
      </div>

      <div className="mt-6 space-y-3">
        {payments.map((payment) => (
          <div key={payment.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{payment.customer}</p>
                <p className="text-sm text-slate-500">Pedido #{payment.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-950">Bs. {payment.amount}</p>
                <p className="text-sm text-slate-500">Vence: {payment.dueTime}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "Pagado" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {payment.status}
              </span>
              {payment.status === "Pendiente" ? (
                <button
                  type="button"
                  onClick={() => onConfirmPayment(payment.id)}
                  className="rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Confirmar pago
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
