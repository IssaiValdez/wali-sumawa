import { useState } from "react";
import type { WhatsappQuery } from "@/components/mesero/types";

interface MeseroWhatsappPanelProps {
  queries: WhatsappQuery[];
  onRespond: (queryId: string, response: string) => void;
}

export function MeseroWhatsappPanel({ queries, onRespond }: MeseroWhatsappPanelProps) {
  const [responses, setResponses] = useState<Record<string, string>>({});

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">WhatsApp</p>
          <h2 className="text-2xl font-semibold text-slate-950">Consultas en vivo</h2>
        </div>
        <p className="text-sm text-slate-600">Atiende mensajes rápidos y marca cada consulta como atendida.</p>
      </div>

      <div className="mt-6 space-y-4">
        {queries.map((query) => (
          <div key={query.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-950">{query.name}</p>
                <p className="text-sm text-slate-500">{query.time}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${query.attended ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {query.attended ? "Atendida" : "Pendiente"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{query.message}</p>
            <textarea
              rows={3}
              value={responses[query.id] ?? ""}
              onChange={(event) => setResponses((prev) => ({ ...prev, [query.id]: event.target.value }))}
              placeholder="Escribe tu respuesta..."
              className="mt-4 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={!responses[query.id]}
                onClick={() => {
                  onRespond(query.id, responses[query.id] ?? "");
                  setResponses((prev) => ({ ...prev, [query.id]: "" }));
                }}
                className="rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Responder
              </button>
              {query.response ? <span className="text-sm text-slate-500">Respuesta enviada</span> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
