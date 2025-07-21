# Sistema de Reservas de Recursos

## Descripción General

Este es un sistema backend para gestión de reservas de recursos desarrollado en Node.js con TypeScript y Express.
Implementa un patrón de arquitectura por capas con separación clara de responsabilidades y manejo de transacciones distribuidas.

## Módulos Principales

### 1. Availability (Disponibilidad)

**Propósito**: Consultar disponibilidad de recursos en fechas específicas

**Endpoints**:

- `GET /availability/:resourceId/:date` - Consultar disponibilidad

**Funcionalidad**:

- Genera slots de tiempo horarios (9 AM - 6 PM)
- Verifica conflictos con reservas existentes
- Retorna slots disponibles y ocupados

```typescript
// Ejemplo de respuesta
{
  "resourceId": "resource-123",
  "date": "2024-01-15",
  "availableSlots": [
    { "startTime": "09:00", "endTime": "10:00" },
    { "startTime": "11:00", "endTime": "12:00" }
  ],
  "unavailableSlots": [
    { "startTime": "10:00", "endTime": "11:00" }
  ]
}
```

### 2. Calendar (Calendario)

**Propósito**: Visualización de reservas en formato calendario

**Endpoints**:

- `GET /calendar` - Obtener vista de calendario

**Estado**: Actualmente deshabilitado (código comentado)

**Funcionalidad Planeada**:

- Filtrar por recurso y rango de fechas
- Agrupar reservas por recurso
- Vista consolidada de todas las reservas

### 3. Reports (Reportes)

**Propósito**: Generar reportes de ocupación y métricas

**Endpoints**:

- `GET /reports/occupancy` - Reporte de ocupación

**Estado**: Actualmente deshabilitado (código comentado)

**Funcionalidad Planeada**:

- Métricas de ocupación por recurso
- Estadísticas de uso
- Filtros por tipo de recurso y fechas

### 4. Reservations (Reservas)

**Propósito**: Gestión completa del ciclo de vida de reservas

**Endpoints**:

- `POST /reservations` - Crear nueva reserva
- `DELETE /reservations/:reservationId` - Cancelar reserva
- `GET /reservations/:reservationId` - Obtener detalles de reserva

**Middleware**:

- `correlationIdMiddleware` - Genera ID de correlación
- `validateReservation` - Validación de datos

**Flujo de Creación de Reserva**:

1. Generación de Correlation ID
2. Creación de contexto de transacción
3. Validación de datos
4. Verificación de conflictos
5. Creación de reserva
6. Actualización de estado de transacción

**Estados de Reserva**:

- `PENDING` - Pendiente de confirmación
- `CONFIRMED` - Confirmada
- `CANCELLED` - Cancelada
- `EXPIRED` - Expirada

### 5. Transactions (Transacciones)

**Propósito**: Monitoreo y gestión de transacciones distribuidas

**Endpoints**:

- `GET /transactions/:correlationId/status` - Estado de transacción
- `GET /transactions/:correlationId/events` - Eventos de transacción
- `POST /transactions/:correlationId/retry` - Reintentar transacción fallida
- `GET /transactions/failed` - Listar transacciones fallidas

**Estados de Transacción**:

- `IN_PROGRESS` - En progreso
- `COMPLETED` - Completada
- `FAILED` - Fallida
- `TIMEOUT` - Expirada por timeout

## Interfaces y Tipos

### Reserva (IReservation)

```typescript
interface IReservation {
  id?: string
  resourceId: string
  userId: string
  startDate: Date
  endDate: Date
  status: ReservationStatus
  correlationId: string
  createdAt?: Date
  updatedAt?: Date
}
```

### Contexto de Transacción (ITransactionContext)

```typescript
interface ITransactionContext {
  correlationId: string
  transactionType: TransactionType
  status: TransactionStatus
  payload: any
  timeoutAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Evento de Dominio (IDomainEvent)

```typescript
interface IDomainEvent {
  eventId: string
  correlationId: string
  eventType: string
  eventData: any
  metadata?: any
  createdAt: Date
}
```

## Características Técnicas

### Manejo de Errores

- Responses estandarizados con `successResponse` y `errorResponse`
- Logging de errores en controllers
- Validación de entrada en services

### Validaciones

- Fechas: Start date debe ser anterior a end date
- Fechas: Start date no puede estar en el pasado
- Recursos: Verificación de existencia
- Conflictos: Detección de solapamientos de reservas

### Timeout y Reintentos

- Timeout de 5 minutos para transacciones
- Capacidad de reintentar transacciones fallidas
- Tracking de transacciones para auditoría

## Funcionalidades Implementadas

✅ **Disponibilidad**: Consulta de slots disponibles
✅ **Reservas**: Creación, cancelación y consulta
✅ **Transacciones**: Seguimiento y gestión de estado
✅ **Validaciones**: Datos de entrada y reglas de negocio
✅ **Manejo de errores**: Responses consistentes

## Funcionalidades Pendientes

⏳ **Calendario**: Vista consolidada de reservas
⏳ **Reportes**: Métricas y estadísticas de uso
⏳ **Eventos**: Sistema completo de eventos de dominio
⏳ **Recursos**: CRUD completo de recursos

## Patrones de Diseño Utilizados

1. **Repository Pattern**: Abstracción de acceso a datos
2. **Service Layer**: Lógica de negocio centralizada
3. **Saga Pattern**: Transacciones distribuidas
4. **Event Sourcing**: Trazabilidad de eventos (parcial)
5. **Correlation ID**: Trazabilidad de requests

## Consideraciones de Escalabilidad

- Uso de Correlation IDs para tracing distribuido
- Arquitectura por capas para mantenibilidad
- Separación de concerns clara
- Preparado para event-driven architecture

## Próximos Pasos Recomendados

1. Completar implementación de calendario y reportes
2. Implementar sistema completo de eventos
3. Agregar tests unitarios y de integración
4. Implementar caching para consultas frecuentes
5. Agregar monitoring y métricas
6. Documentar APIs con OpenAPI/Swagger
