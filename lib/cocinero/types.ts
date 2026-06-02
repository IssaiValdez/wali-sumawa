export type PedidoEstado = 'pendiente' | 'preparando' | 'entregado' | 'cancelado';
export type TiempoEstimado = number | null; // minutos

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  receta: string;
  agotado: boolean;
  tiempoPreparacion?: number; // minutos
}

export interface ItemPedido {
  productoId: string;
  nombre: string;
  cantidad: number;
  notas?: string;
  tiempoEstimado?: TiempoEstimado;
}

export interface Pedido {
  id: string;
  numero: number;
  items: ItemPedido[];
  estado: PedidoEstado;
  fechaCreacion: Date;
  fechaEntrega?: Date;
  tiempoEstimado?: TiempoEstimado;
  cliente?: string;
  mesa?: string;
}

export interface ConfiguracionCocinero {
  cocinaSaturada: boolean;
  pausa: boolean;
  volumenNotificaciones: boolean;
  sonidoNotificacion: boolean;
}

export interface ResumenProducto {
  productoId: string;
  nombre: string;
  cantidadTotal: number;
  pedidosConProducto: string[];
}
