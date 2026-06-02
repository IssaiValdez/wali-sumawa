export type OrderStatus = "Pendiente" | "En preparación" | "Listo" | "Entregado" | "Cancelado";
export type OrderOrigin = "WhatsApp" | "Mesa";

export interface OrderHistoryEntry {
  id: string;
  orderId: string;
  timestamp: string;
  summary: string;
}

export interface Order {
  id: string;
  number: string;
  customer: string;
  table: string;
  time: string;
  status: OrderStatus;
  origin: OrderOrigin;
  productSummary: string;
  assignedWaiter: string;
  eta?: string;
  delayNotified?: string;
}

export interface Dish {
  id: string;
  name: string;
  category: string;
  available: boolean;
  stock: number;
  price: number;
}

export interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  status: "Pendiente" | "Pagado";
  dueTime: string;
}

export interface WhatsappQuery {
  id: string;
  name: string;
  message: string;
  time: string;
  attended: boolean;
  response?: string;
}

export interface Promotion {
  id: string;
  title: string;
  discount: number;
  active: boolean;
  expiresAt: string;
}

export interface TableOrderPayload {
  table: string;
  customer: string;
  products: Array<{ id: string; name: string; qty: number }>;
}
