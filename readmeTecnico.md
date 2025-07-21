# Sistema de Reservas de Recursos

Este es un sistema backend para gestión de reservas de recursos desarrollado en Node.js con TypeScript y Express.

## Módulos Principales

### 1. Availability

Consultar disponibilidad de recursos en fechas específicas

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

### 2. Calendar

Visualización de reservas en formato calendario

- `GET /calendar` - Obtener vista de calendario

**Funcionalidad**:

- Filtrar por recurso y rango de fechas
- Agrupar reservas por recurso
- Vista consolidada de todas las reservas

### 3. Reports

Generar reportes de ocupación y métricas

- `GET /reports/occupancy` - Reporte de ocupación

**Funcionalidad**:

- Métricas de ocupación por recurso
- Estadísticas de uso
- Filtros por tipo de recurso y fechas

### 4. Reservations

Gestión completa del ciclo de vida de reservas

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

### 5. Transactions

Monitoreo y gestión de transacciones distribuidas

- `GET /transactions/:correlationId/status` - Estado de transacción
- `GET /transactions/:correlationId/events` - Eventos de transacción
- `POST /transactions/:correlationId/retry` - Reintentar transacción fallida
- `GET /transactions/failed` - Listar transacciones fallidas

**Estados de Transacción**:

- `IN_PROGRESS` - En progreso
- `COMPLETED` - Completada
- `FAILED` - Fallida
- `TIMEOUT` - Expirada por timeout
