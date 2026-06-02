'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Pedido, Producto, ConfiguracionCocinero, PedidoEstado } from './types';
import { generarNumeroPedido, reproducirSonido } from './utils';

interface CocineroContextType {
  pedidos: Pedido[];
  productos: Producto[];
  configuracion: ConfiguracionCocinero;
  agregarPedido: (items: any[]) => void;
  actualizarEstadoPedido: (pedidoId: string, nuevoEstado: PedidoEstado) => void;
  asignarTiempoEstimado: (pedidoId: string, minutos: number) => void;
  marcarProductoAgotado: (productoId: string, agotado: boolean) => void;
  actualizarConfiguracion: (config: Partial<ConfiguracionCocinero>) => void;
  obtenerPedidoPorId: (pedidoId: string) => Pedido | undefined;
  limpiarHistorial: () => void;
}

const CocineroContext = createContext<CocineroContextType | undefined>(undefined);

const PRODUCTOS_INICIALES: Producto[] = [
  {
    id: '1',
    nombre: 'Hamburguesa Clásica',
    precio: 8.99,
    receta: 'Pan tostado, 150g de carne molida, lechuga, tomate, cebolla, queso cheddar, mostaza y mayonesa',
    agotado: false,
    tiempoPreparacion: 8,
  },
  {
    id: '2',
    nombre: 'Papas Fritas',
    precio: 3.99,
    receta: 'Papas cortadas en bastones, sal gruesa, freír a 170°C hasta doradas',
    agotado: false,
    tiempoPreparacion: 5,
  },
  {
    id: '3',
    nombre: 'Sándwich de Pollo',
    precio: 7.99,
    receta: 'Pan, pechuga de pollo a la plancha, lechuga, tomate, salsa de ajo, queso',
    agotado: false,
    tiempoPreparacion: 10,
  },
  {
    id: '4',
    nombre: 'Ensalada César',
    precio: 6.99,
    receta: 'Lechuga romana, crutones, parmesano, aderezo césar casero',
    agotado: false,
    tiempoPreparacion: 5,
  },
  {
    id: '5',
    nombre: 'Pizza Margarita',
    precio: 11.99,
    receta: 'Masa preparada, salsa de tomate, mozzarella, tomate fresco, albahaca, horno a 220°C por 12 minutos',
    agotado: false,
    tiempoPreparacion: 15,
  },
];

export function CocineroProvider({ children }: { children: React.ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIALES);
  const [configuracion, setConfiguracion] = useState<ConfiguracionCocinero>({
    cocinaSaturada: false,
    pausa: false,
    volumenNotificaciones: true,
    sonidoNotificacion: true,
  });
  const [notificacionesActivas, setNotificacionesActivas] = useState(true);

  // Cargar datos desde localStorage
  useEffect(() => {
    const pedidosGuardados = localStorage.getItem('cocinero_pedidos');
    const productosGuardados = localStorage.getItem('cocinero_productos');
    const configGuardada = localStorage.getItem('cocinero_config');

    if (pedidosGuardados) {
      try {
        const pedidosParseados = JSON.parse(pedidosGuardados).map((p: any) => ({
          ...p,
          fechaCreacion: new Date(p.fechaCreacion),
          fechaEntrega: p.fechaEntrega ? new Date(p.fechaEntrega) : undefined,
        }));
        setPedidos(pedidosParseados);
      } catch (e) {
        console.error('Error al cargar pedidos:', e);
      }
    }

    if (productosGuardados) {
      try {
        setProductos(JSON.parse(productosGuardados));
      } catch (e) {
        console.error('Error al cargar productos:', e);
      }
    }

    if (configGuardada) {
      try {
        setConfiguracion(JSON.parse(configGuardada));
      } catch (e) {
        console.error('Error al cargar configuración:', e);
      }
    }
  }, []);

  // Guardar pedidos en localStorage
  useEffect(() => {
    localStorage.setItem('cocinero_pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  // Guardar productos en localStorage
  useEffect(() => {
    localStorage.setItem('cocinero_productos', JSON.stringify(productos));
  }, [productos]);

  // Guardar configuración en localStorage
  useEffect(() => {
    localStorage.setItem('cocinero_config', JSON.stringify(configuracion));
  }, [configuracion]);

  const agregarPedido = useCallback(
    (items: any[]) => {
      if (configuracion.pausa) return;

      const nuevoPedido: Pedido = {
        id: Math.random().toString(36).substr(2, 9),
        numero: generarNumeroPedido(),
        items,
        estado: 'pendiente',
        fechaCreacion: new Date(),
      };

      setPedidos(prev => [nuevoPedido, ...prev]);

      if (configuracion.sonidoNotificacion && notificacionesActivas) {
        reproducirSonido('nueva-comanda');
      }

      if (configuracion.volumenNotificaciones) {
        // Mostrar notificación visual aquí
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('¡Nueva Comanda!', {
            body: `Pedido #${nuevoPedido.numero} con ${items.length} producto(s)`,
            tag: 'nueva-comanda',
          });
        }
      }
    },
    [configuracion, notificacionesActivas]
  );

  const actualizarEstadoPedido = useCallback((pedidoId: string, nuevoEstado: PedidoEstado) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === pedidoId
          ? {
              ...p,
              estado: nuevoEstado,
              fechaEntrega: nuevoEstado === 'entregado' ? new Date() : p.fechaEntrega,
            }
          : p
      )
    );

    // Notificación si el pedido es cancelado
    if (nuevoEstado === 'cancelado') {
      if (configuracion.sonidoNotificacion && notificacionesActivas) {
        reproducirSonido('cancelacion');
      }
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('⚠️ Pedido Cancelado', {
          body: `El pedido ha sido cancelado. Detén la preparación`,
          tag: 'pedido-cancelado',
        });
      }
    }
  }, [configuracion, notificacionesActivas]);

  const asignarTiempoEstimado = useCallback((pedidoId: string, minutos: number) => {
    setPedidos(prev =>
      prev.map(p =>
        p.id === pedidoId
          ? { ...p, tiempoEstimado: minutos }
          : p
      )
    );
  }, []);

  const marcarProductoAgotado = useCallback((productoId: string, agotado: boolean) => {
    setProductos(prev =>
      prev.map(p =>
        p.id === productoId
          ? { ...p, agotado }
          : p
      )
    );
  }, []);

  const actualizarConfiguracion = useCallback((config: Partial<ConfiguracionCocinero>) => {
    setConfiguracion(prev => ({ ...prev, ...config }));

    if (config.cocinaSaturada && configuracion.sonidoNotificacion) {
      reproducirSonido('saturada');
    }
  }, [configuracion.sonidoNotificacion]);

  const obtenerPedidoPorId = useCallback(
    (pedidoId: string) => pedidos.find(p => p.id === pedidoId),
    [pedidos]
  );

  const limpiarHistorial = useCallback(() => {
    setPedidos(prev => prev.filter(p => p.estado !== 'entregado'));
  }, []);

  return (
    <CocineroContext.Provider
      value={{
        pedidos,
        productos,
        configuracion,
        agregarPedido,
        actualizarEstadoPedido,
        asignarTiempoEstimado,
        marcarProductoAgotado,
        actualizarConfiguracion,
        obtenerPedidoPorId,
        limpiarHistorial,
      }}
    >
      {children}
    </CocineroContext.Provider>
  );
}

export function useCocinero() {
  const context = useContext(CocineroContext);
  if (context === undefined) {
    throw new Error('useCocinero debe ser usado dentro de CocineroProvider');
  }
  return context;
}
