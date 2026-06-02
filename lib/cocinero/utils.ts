import { Pedido, ResumenProducto } from './types';

export function generarNumeroPedido(): number {
  return Math.floor(Math.random() * 10000) + 1;
}

export function calcularResumenProductos(pedidos: Pedido[]): ResumenProducto[] {
  const resumen: { [key: string]: ResumenProducto } = {};

  pedidos
    .filter(p => p.estado === 'pendiente' || p.estado === 'preparando')
    .forEach(pedido => {
      pedido.items.forEach(item => {
        if (!resumen[item.productoId]) {
          resumen[item.productoId] = {
            productoId: item.productoId,
            nombre: item.nombre,
            cantidadTotal: 0,
            pedidosConProducto: [],
          };
        }
        resumen[item.productoId].cantidadTotal += item.cantidad;
        if (!resumen[item.productoId].pedidosConProducto.includes(pedido.id)) {
          resumen[item.productoId].pedidosConProducto.push(pedido.id);
        }
      });
    });

  return Object.values(resumen).sort((a, b) => b.cantidadTotal - a.cantidadTotal);
}

export function reproducirSonido(tipo: 'nueva-comanda' | 'cancelacion' | 'saturada') {
  if (typeof window === 'undefined') return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  switch (tipo) {
    case 'nueva-comanda':
      oscillator.frequency.value = 800;
      gain.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      break;

    case 'cancelacion':
      oscillator.frequency.value = 300;
      gain.gain.setValueAtTime(0.4, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;

    case 'saturada':
      oscillator.frequency.value = 600;
      for (let i = 0; i < 3; i++) {
        oscillator.start(audioContext.currentTime + i * 0.3);
        oscillator.stop(audioContext.currentTime + i * 0.3 + 0.2);
      }
      break;
  }
}

export function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(fecha);
}

export function calcularTiempoTranscurrido(fechaCreacion: Date): string {
  const ahora = new Date();
  const diferencia = Math.floor((ahora.getTime() - fechaCreacion.getTime()) / 1000);

  if (diferencia < 60) return `${diferencia}s`;
  if (diferencia < 3600) return `${Math.floor(diferencia / 60)}m`;
  return `${Math.floor(diferencia / 3600)}h`;
}
