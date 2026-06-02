# 🍳 Panel del Cocinero - Rama Cocinero

## Descripción General

Este es un panel completo e intuitivo diseñado para que los cocineros de un kiosco gestionen pedidos, productos y entregas de manera eficiente. El sistema cumple con todos los requisitos especificados y proporciona una interfaz moderna con notificaciones en tiempo real.

## ✨ Características Principales

### 1. **Visualización de Pedidos Pendientes** 
- Vista clara de todos los pedidos en estado "Pendiente" y "Preparando"
- Información de cliente y mesa (si aplica)
- Tiempo transcurrido desde la creación del pedido
- Detalles de cada producto con notas adicionales

### 2. **Notas y Modificaciones de Productos**
- Visualiza las notas especiales o modificaciones de cada producto
- Ejemplo: "Sin cebolla", "Extra queso", "Sin salsa", etc.
- Integrado en la tarjeta de cada pedido

### 3. **Gestión de Productos Agotados**
- Botón rápido para marcar productos como agotados
- Modal de control con separación clara entre disponibles y agotados
- Impide que se continúen tomando pedidos de productos sin stock

### 4. **Notificaciones Visuales y Sonoras**
- 🔔 Notificaciones visuales en tiempo real cuando llega un nuevo pedido
- 🔊 Sonido distintivo para nuevas comandas
- ⚠️ Sonido urgente cuando se cancela un pedido
- Configurable desde el panel de configuración

### 5. **Resumen de Productos en Preparación**
- Vista desplegable con total de cantidad de cada producto
- Muestra en qué pedidos está presente cada producto
- Facilita optimizar el uso de plancha/freidora
- Ordenado por cantidad total (descendente)

### 6. **Historial de Entregas**
- Acceso a lista completa de pedidos ya entregados
- Información de fecha/hora de entrega
- Detalles de cliente, mesa y productos
- Permite resolver dudas y verificar entregas recientes
- Opción de limpiar historial

### 7. **Control de "Cocina Saturada"**
- Activa estado de cocina saturada para informar a cajeros
- Notificación sonora especial al activar
- Pausa la entrada de nuevos pedidos si se requiere

### 8. **Asignación de Tiempos Estimados**
- Asigna tiempo en minutos a cada pedido
- Se muestra en la tarjeta del pedido
- Útil para que clientes/meseros sepan cuánto tardará

### 9. **Visor de Recetas y Procesos**
- Acceso a receta completa de cada producto
- Incluye tiempo estimado de preparación
- Consejos útiles para preparación
- Ideal para personal nuevo o productos poco frecuentes

### 10. **Actualización de Estados**
- Cambio rápido entre estados: Pendiente → Preparando → Entregado
- Opción de cancelación urgente (genera notificación)
- Registro automático de fecha/hora de entrega

## 🎯 Casos de Uso

### Caso 1: Nueva Comanda Llega
```
1. Sistema reproduce sonido de alerta
2. Se muestra notificación visual en navegador
3. Aparece nuevo pedido en lista de "Pendientes"
4. Cocinero ve notas y modificaciones especiales
5. Asigna tiempo estimado de preparación
6. Marca como "Preparando" al empezar
```

### Caso 2: Producto Se Agota
```
1. Cocinero abre "Gestionar Productos Agotados"
2. Selecciona el producto que se agotó
3. Marca como "Agotado"
4. El sistema evita nuevos pedidos con ese producto
5. Cajero ve indicador visual de producto no disponible
```

### Caso 3: Verificar Entregas Recientes
```
1. Cocinero navega a "Historial"
2. Ve lista completa de pedidos entregados
3. Puede resolver dudas sobre qué se entregó
4. Verifica tiempos de preparación
5. Identifica patrones o problemas
```

## 🖥️ Interfaz y Navegación

### Página Principal (`/cocinero`)
- **Resumen visual**: Pedidos pendientes y entregados
- **Simulador**: Genera pedidos de prueba
- **Lista activa**: Todos los pedidos en preparación
- **Enlaces**: Acceso a Historial y Resumen

### Página de Historial (`/cocinero/historial`)
- **Lista completa**: Pedidos entregados
- **Información detallada**: Productos, notas, tiempos
- **Limpiar historial**: Elimina entregas pasadas

### Página de Resumen (`/cocinero/resumen`)
- **Estadísticas**: Total pendientes, tiempo estimado, productos únicos
- **Tabla desglosada**: Cantidad de cada producto
- **Consejos**: Optimización de preparación

### Panel Lateral
- **Gestionar Productos**: Marcar como agotados/disponibles
- **Recetas**: Acceso a instrucciones y procesos
- **Configuración**: Ajustes de notificaciones y estado

## ⚙️ Configuración

Accede al panel de **Configuración** para:
- ✅/❌ Activar notificaciones sonoras
- 🍳 Activar estado "Cocina Saturada"
- ⏸️ Pausar entrada de nuevos pedidos
- 📊 Ver estado actual (pendientes, saturada, pausa)

## 💾 Almacenamiento

El sistema utiliza **localStorage** para guardar:
- Todos los pedidos (pendientes, en preparación, entregados)
- Estado de cada producto
- Configuración de preferencias
- Historial de entregas

Los datos persisten entre sesiones.

## 🎨 Diseño y UX

- **Colores intuitivos**: Rojo para urgente, amarillo para en proceso, verde para completado
- **Responsive**: Funciona en desktop, tablet y mobile
- **Accesible**: Botones grandes, texto claro, alto contraste
- **Rápido**: Interfaz fluida sin recargas

## 📊 Datos de Ejemplo

El sistema viene con 5 productos precargados:
1. Hamburguesa Clásica (8 min)
2. Papas Fritas (5 min)
3. Sándwich de Pollo (10 min)
4. Ensalada César (5 min)
5. Pizza Margarita (15 min)

Puedes agregar más productos editando `lib/cocinero/context.tsx`

## 🚀 Cómo Usar

### 1. Acceder al Panel
```
Navega a: http://localhost:3000/cocinero
```

### 2. Simular Nuevos Pedidos (Testing)
```
- Abre el Simulador en la página principal
- Elige "Generar Pedido Aleatorio" o selecciona un set específico
- Observa las notificaciones y cambios en tiempo real
```

### 3. Gestionar Pedidos
```
- Visualiza el pedido completo con todas las notas
- Haz clic en "Empezar Preparación" cuando comiences
- Asigna tiempo estimado si es necesario
- Marca como "Entregado" cuando termines
```

### 4. Consultar Historial
```
- Navega a "Historial"
- Busca información de entregas recientes
- Limpia historial antiguo si es necesario
```

## 🔧 Requisitos Técnicos

- Next.js 16+
- React 19+
- Tailwind CSS 4
- TypeScript
- Navegador moderno con soporte para:
  - Web Audio API (notificaciones sonoras)
  - Notifications API (alertas visuales)
  - localStorage

## 📝 Estructura del Proyecto

```
app/cocinero/
├── layout.tsx           # Layout principal del panel
├── page.tsx             # Panel principal
├── historial/
│   └── page.tsx         # Página de historial
└── resumen/
    └── page.tsx         # Página de resumen

components/cocinero/
├── TarjetaPedido.tsx        # Componente de pedido individual
├── ListaPedidosPendientes.tsx
├── ResumenProductos.tsx
├── HistorialPedidos.tsx
├── ControlProductos.tsx
├── Configuracion.tsx
└── VisorRecetas.tsx

lib/cocinero/
├── types.ts             # Tipos de datos
├── context.tsx          # Context API y estado global
└── utils.ts             # Funciones auxiliares
```

## ✅ Requisitos Cumplidos

- ✅ Visualizar notas y modificaciones de productos
- ✅ Marcar productos como agotados
- ✅ Notificaciones visuales y sonoras
- ✅ Resumen de cantidad total de productos
- ✅ Historial de entregas
- ✅ Notificación urgente de cancelaciones
- ✅ Estado "Cocina Saturada"
- ✅ Asignar tiempo estimado
- ✅ Visor de recetas
- ✅ Visualizar y actualizar pedidos pendientes

## 🐛 Troubleshooting

### Las notificaciones sonoras no funcionan
- Verifica que las notificaciones estén habilitadas en el navegador
- Comprueba que el volumen del dispositivo no esté en silencio
- Abre la consola (F12) para ver errores

### Los datos no persisten
- Asegúrate que localStorage esté habilitado
- Comprueba la privacidad del navegador (modo incógnito desactiva localStorage)
- Verifica que tengas espacio disponible en localStorage

### Los cambios no se ven
- Recarga la página (F5)
- Limpia el caché del navegador
- Verifica que estés en la rama Cocinero correcta

## 📧 Contacto y Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Rama**: Cocinero  
**Estado**: En producción ✅
