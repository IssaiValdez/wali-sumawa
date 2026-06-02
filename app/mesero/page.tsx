"use client";

import { useMemo, useState } from "react";
import { MeseroDelayNotice } from "@/components/mesero/MeseroDelayNotice";
import { MeseroHeader } from "@/components/mesero/MeseroHeader";
import { MeseroHistoryPanel } from "@/components/mesero/MeseroHistoryPanel";
import { MeseroMetrics } from "@/components/mesero/MeseroMetrics";
import { MeseroOrdersTable } from "@/components/mesero/MeseroOrdersTable";
import { MeseroPaymentsPanel } from "@/components/mesero/MeseroPaymentsPanel";
import { MeseroProductsPanel } from "@/components/mesero/MeseroProductsPanel";
import { MeseroPromotionsPanel } from "@/components/mesero/MeseroPromotionsPanel";
import { MeseroSidebar } from "@/components/mesero/MeseroSidebar";
import { MeseroTableOrderForm } from "@/components/mesero/MeseroTableOrderForm";
import { MeseroWhatsappPanel } from "@/components/mesero/MeseroWhatsappPanel";
import type {
  Dish,
  Order,
  OrderHistoryEntry,
  OrderStatus,
  Payment,
  Promotion,
  WhatsappQuery,
} from "@/components/mesero/types";

const orderStatusValues: OrderStatus[] = ["Pendiente", "En preparación", "Listo", "Entregado"];

const buildTimestamp = () =>
  new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const initialOrders: Order[] = [
  {
    id: "order-101",
    number: "101",
    customer: "María López",
    table: "Mesa 3",
    time: "12:10",
    status: "Pendiente",
    origin: "Mesa",
    productSummary: "Pizza BBQ, Ensalada César",
    assignedWaiter: "Samuel",
  },
  {
    id: "order-102",
    number: "102",
    customer: "Carlos Vega",
    table: "Mesa 6",
    time: "12:22",
    status: "En preparación",
    origin: "WhatsApp",
    productSummary: "Lomo saltado, Jugo de maracuyá",
    assignedWaiter: "Samuel",
    eta: "14 min",
  },
  {
    id: "order-103",
    number: "103",
    customer: "Luisa Nieto",
    table: "Mesa 1",
    time: "12:28",
    status: "Listo",
    origin: "Mesa",
    productSummary: "Ceviche mixto, Chicha morada",
    assignedWaiter: "Samuel",
  },
  {
    id: "order-104",
    number: "104",
    customer: "Antonio Ruiz",
    table: "Mesa 5",
    time: "12:30",
    status: "Entregado",
    origin: "WhatsApp",
    productSummary: "Pollo a la brasa, Papas fritas",
    assignedWaiter: "Samuel",
  },
  {
    id: "order-105",
    number: "105",
    customer: "Claudia Paredes",
    table: "Mesa 8",
    time: "12:34",
    status: "Pendiente",
    origin: "Mesa",
    productSummary: "Sopa de pollo, Jugo de naranja",
    assignedWaiter: "Samuel",
  },
];

const initialDishes: Dish[] = [
  { id: "dish-1", name: "Pizza BBQ", category: "Principal", available: true, stock: 12, price: 18 },
  { id: "dish-2", name: "Ensalada César", category: "Acompañamiento", available: true, stock: 8, price: 9 },
  { id: "dish-3", name: "Ceviche mixto", category: "Principal", available: false, stock: 0, price: 16 },
  { id: "dish-4", name: "Pollo a la brasa", category: "Principal", available: true, stock: 6, price: 21 },
  { id: "dish-5", name: "Lomo saltado", category: "Principal", available: true, stock: 5, price: 20 },
];

const initialPayments: Payment[] = [
  { id: "pay-601", orderId: "order-101", customer: "María López", amount: 27, status: "Pendiente", dueTime: "12:55" },
  { id: "pay-602", orderId: "order-102", customer: "Carlos Vega", amount: 22, status: "Pagado", dueTime: "12:50" },
  { id: "pay-603", orderId: "order-105", customer: "Claudia Paredes", amount: 15, status: "Pendiente", dueTime: "13:05" },
];

const initialWhatsapp: WhatsappQuery[] = [
  { id: "chat-1", name: "Paola Jiménez", message: "¿Tienen sangría disponible?", time: "12:42", attended: false },
  { id: "chat-2", name: "Juan Torres", message: "Quiero modificar mi pedido 102.", time: "12:46", attended: false },
];

const initialPromotions: Promotion[] = [
  { id: "promo-1", title: "Hora feliz", discount: 15, active: true, expiresAt: "Hoy 16:00" },
  { id: "promo-2", title: "Descuento parejas", discount: 20, active: true, expiresAt: "Domingo" },
  { id: "promo-3", title: "Menú ejecutivo", discount: 10, active: false, expiresAt: "N/A" },
];

const initialHistory: OrderHistoryEntry[] = [
  { id: "history-1", orderId: "order-102", timestamp: "12:23 02/06/2026", summary: "Pedido recibido desde WhatsApp." },
  { id: "history-2", orderId: "order-102", timestamp: "12:25 02/06/2026", summary: "Pago confirmado, cambia a En preparación." },
  { id: "history-3", orderId: "order-104", timestamp: "12:33 02/06/2026", summary: "Pedido entregado al cliente." },
  { id: "history-4", orderId: "order-101", timestamp: "12:12 02/06/2026", summary: "Pedido en mesa registrado y pendiente." },
];

export default function MeseroPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [whatsapp, setWhatsapp] = useState<WhatsappQuery[]>(initialWhatsapp);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [history, setHistory] = useState<OrderHistoryEntry[]>(initialHistory);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("Todo");
  const [searchOrder, setSearchOrder] = useState<string>("");
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [promoEditId, setPromoEditId] = useState<string | null>(null);
  const [promoForm, setPromoForm] = useState({ title: "Nueva promoción", discount: 15, active: true });
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editCustomer, setEditCustomer] = useState("");
  const [editTable, setEditTable] = useState("");
  const [delayText, setDelayText] = useState("10 min");

  const metrics = useMemo(
    () => [
      { label: "Pedidos pendientes", value: orders.filter((item) => item.status === "Pendiente").length, accent: "linear-gradient(135deg, rgba(14,165,233,0.95), rgba(14,165,233,0.55))" },
      { label: "Pedidos en preparación", value: orders.filter((item) => item.status === "En preparación").length, accent: "linear-gradient(135deg, rgba(16,185,129,0.95), rgba(16,185,129,0.55))" },
      { label: "Pedidos listos", value: orders.filter((item) => item.status === "Listo").length, accent: "linear-gradient(135deg, rgba(234,179,8,0.95), rgba(234,179,8,0.55))" },
      { label: "Pedidos entregados", value: orders.filter((item) => item.status === "Entregado").length, accent: "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(168,85,247,0.55))" },
      { label: "Consultas WhatsApp pendientes", value: whatsapp.filter((item) => !item.attended).length, accent: "linear-gradient(135deg, rgba(249,115,22,0.95), rgba(249,115,22,0.55))" },
      { label: "Promociones activas", value: promotions.filter((promo) => promo.active).length, accent: "linear-gradient(135deg, rgba(14,116,144,0.95), rgba(14,116,144,0.55))" },
    ],
    [orders, whatsapp, promotions],
  );

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesStatus = orderStatusFilter === "Todo" || order.status === orderStatusFilter;
        const matchesSearch = order.number.includes(searchOrder.trim());
        return matchesStatus && matchesSearch;
      }),
    [orders, orderStatusFilter, searchOrder],
  );

  const addHistoryEntry = (orderId: string, summary: string) => {
    setHistory((prev) => [
      { id: `history-${Date.now()}-${orderId}`, orderId, timestamp: buildTimestamp(), summary },
      ...prev,
    ]);
  };

  const handleChangeOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              eta: newStatus === "En preparación" ? "15 min" : order.eta,
            }
          : order,
      ),
    );
    addHistoryEntry(orderId, `Cambio de estado a ${newStatus}`);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "Cancelado" } : order)));
    addHistoryEntry(orderId, "Pedido cancelado antes de preparación.");
  };

  const handleConfirmPayment = (paymentId: string) => {
    const payment = payments.find((item) => item.id === paymentId);
    if (!payment) return;

    setPayments((prev) => prev.map((item) => (item.id === paymentId ? { ...item, status: "Pagado" } : item)));
    setOrders((prev) =>
      prev.map((order) =>
        order.id === payment.orderId
          ? {
              ...order,
              status: "En preparación",
              eta: "12 min",
            }
          : order,
      ),
    );
    addHistoryEntry(payment.orderId, `Pago confirmado. Pedido pasa a En preparación.`);
  };

  const handleToggleDish = (dishId: string) => {
    setDishes((prev) =>
      prev.map((dish) =>
        dish.id === dishId
          ? {
              ...dish,
              available: !dish.available,
              stock: dish.available ? 0 : Math.max(5, dish.stock),
            }
          : dish,
      ),
    );
  };

  const handleRespondWhatsapp = (queryId: string, response: string) => {
    setWhatsapp((prev) =>
      prev.map((query) =>
        query.id === queryId ? { ...query, attended: true, response } : query,
      ),
    );
  };

  const handleOpenPromotionModal = (promoId: string | null = null) => {
    if (!promoId) {
      setPromoForm({ title: "Nueva promoción", discount: 15, active: true });
      setPromoEditId(null);
      setPromoModalOpen(true);
      return;
    }

    const promo = promotions.find((item) => item.id === promoId);
    if (!promo) return;
    setPromoForm({ title: promo.title, discount: promo.discount, active: promo.active });
    setPromoEditId(promoId);
    setPromoModalOpen(true);
  };

  const handleSavePromotion = () => {
    if (promoEditId) {
      setPromotions((prev) =>
        prev.map((promo) =>
          promo.id === promoEditId ? { ...promo, ...promoForm } : promo,
        ),
      );
    } else {
      setPromotions((prev) => [
        {
          id: `promo-${Date.now()}`,
          title: promoForm.title,
          discount: promoForm.discount,
          active: promoForm.active,
          expiresAt: "Nuevo",
        },
        ...prev,
      ]);
    }
    setPromoModalOpen(false);
  };

  const handleDisablePromotion = (promoId: string) => {
    setPromotions((prev) => prev.map((promo) => (promo.id === promoId ? { ...promo, active: false } : promo)));
  };

  const handleRegisterTableOrder = (orderData: { table: string; customer: string; products: Array<{ id: string; name: string; qty: number }> }) => {
    const summary = orderData.products.map((item) => `${item.name} x${item.qty}`).join(", ");
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      number: `${Math.floor(200 + Math.random() * 300)}`,
      customer: orderData.customer,
      table: orderData.table,
      time: new Date().toLocaleTimeString("es-ES", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      status: "Pendiente",
      origin: "Mesa",
      productSummary: summary,
      assignedWaiter: "Samuel",
    };
    setOrders((prev) => [newOrder, ...prev]);
    addHistoryEntry(newOrder.id, `Pedido en mesa registrado: ${summary}`);
  };

  const handleNotifyDelay = () => {
    setDelayText((current) => (current === "10 min" ? "15 min" : "10 min"));
    addHistoryEntry("order-101", "Notificación de demora emitida al cliente.");
  };

  const handleOpenEditOrder = (orderId: string) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;
    setEditingOrderId(orderId);
    setEditCustomer(order.customer);
    setEditTable(order.table);
  };

  const handleSaveOrderEdit = () => {
    if (!editingOrderId) return;
    setOrders((prev) =>
      prev.map((order) =>
        order.id === editingOrderId ? { ...order, customer: editCustomer, table: editTable } : order,
      ),
    );
    addHistoryEntry(editingOrderId, "Pedido modificado antes de preparación.");
    setEditingOrderId(null);
  };

  const openOrders = orders.filter((item) => item.status !== "Entregado" && item.status !== "Cancelado").length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto max-w-[1580px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="hidden xl:block">
            <MeseroSidebar />
          </aside>

          <main className="space-y-6">
            <MeseroHeader
              title="Dashboard Mesero"
              subtitle="Panel interactivo para supervisar pedidos, pagos, consultas y promociones en tiempo real."
              actionLabel="Registrar nuevo pedido"
              actionOnClick={() => {
                window.document.getElementById("new-order-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            <MeseroMetrics metrics={metrics} />

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pedidos en tiempo real</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-950">Gestión de pedidos</h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {orderStatusValues.map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${orderStatusFilter === status ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"}`}
                        onClick={() => setOrderStatusFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${orderStatusFilter === "Todo" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"}`}
                      onClick={() => setOrderStatusFilter("Todo")}
                    >
                      Todo
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <MeseroOrdersTable
                    orders={filteredOrders}
                    history={history}
                    statusFilter={orderStatusFilter}
                    onFilterChange={setOrderStatusFilter}
                    searchValue={searchOrder}
                    onSearchChange={setSearchOrder}
                    onChangeStatus={handleChangeOrderStatus}
                    onEditOrder={handleOpenEditOrder}
                    onCancelOrder={handleCancelOrder}
                  />
                </div>
              </section>

              <div className="space-y-6">
                <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                  <MeseroPromotionsPanel
                    promotions={promotions}
                    onOpenPromotion={handleOpenPromotionModal}
                    onDisablePromotion={handleDisablePromotion}
                  />
                </section>

                <MeseroDelayNotice
                  currentEta={delayText}
                  onNotifyDelay={handleNotifyDelay}
                  pendingOrders={openOrders}
                />
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                  <MeseroProductsPanel dishes={dishes} onToggleAvailability={handleToggleDish} />
                </section>

                <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                  <MeseroPaymentsPanel payments={payments} onConfirmPayment={handleConfirmPayment} />
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                  <MeseroWhatsappPanel queries={whatsapp} onRespond={handleRespondWhatsapp} />
                </section>

                <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                  <MeseroHistoryPanel history={history} />
                </section>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
              <section id="new-order-form" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                <MeseroTableOrderForm dishes={dishes} onSubmit={handleRegisterTableOrder} />
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Memo rápido</p>
                  <h2 className="text-2xl font-semibold text-slate-950">Estado de cocina</h2>
                  <p className="text-sm leading-6 text-slate-600">
                    Guarda y modifica pedidos antes de que pasen a preparación. Este espacio ayuda a mantener la cocina sincronizada.
                  </p>
                </div>
                <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-700">Pedidos activos</p>
                  <p className="mt-2 text-4xl font-semibold text-slate-950">{openOrders}</p>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {promoModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl shadow-slate-900/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Promoción</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                  {promoEditId ? "Editar promoción" : "Crear promoción"}
                </h3>
              </div>
              <button type="button" className="text-slate-500 hover:text-slate-900" onClick={() => setPromoModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className="mt-6 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Título de promoción
                <input
                  type="text"
                  value={promoForm.title}
                  onChange={(event) => setPromoForm({ ...promoForm, title: event.target.value })}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Descuento (%)
                <input
                  type="number"
                  min={5}
                  max={80}
                  value={promoForm.discount}
                  onChange={(event) => setPromoForm({ ...promoForm, discount: Number(event.target.value) })}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={promoForm.active}
                  onChange={(event) => setPromoForm({ ...promoForm, active: event.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-slate-900"
                />
                Activar promoción
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPromoModalOpen(false)}
                className="rounded-3xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSavePromotion}
                className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Guardar promoción
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editingOrderId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-6 shadow-2xl shadow-slate-900/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Editar pedido</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">Modificar datos antes de preparación</h3>
              </div>
              <button type="button" className="text-slate-500 hover:text-slate-900" onClick={() => setEditingOrderId(null)}>
                ✕
              </button>
            </div>
            <div className="mt-6 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Cliente
                <input
                  type="text"
                  value={editCustomer}
                  onChange={(event) => setEditCustomer(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Mesa
                <input
                  type="text"
                  value={editTable}
                  onChange={(event) => setEditTable(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setEditingOrderId(null)}
                className="rounded-3xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={handleSaveOrderEdit}
                className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
