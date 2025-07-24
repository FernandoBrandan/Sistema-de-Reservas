# Documento de Análisis de Requerimientos - Sistema de Reservas

## 1. Visión General del Sistema

**Problema identificado:** Separar las operaciones de reserva (que requieren verificación y bloqueo) de las consultas de disponibilidad (que deben ser ultra-rápidas) para evitar cuellos de botella.

**Arquitectura principal:** Microservicio con patrón Saga Choreography + RabbitMQ + CQRS

**Stack tecnológico:** Node.js, Express, TypeScript, PostgreSQL, Sequelize

## 2. Arquitectura del Sistema

### Estructura de Capas
```
src/
├── routes/           # Router layer
├── controllers/      # Controller layer  
├── services/         # Business logic layer
├── repositories/     # Data access layer
├── models/           # Data models & interfaces
├── events/           # Event handling (RabbitMQ)
└── sagas/            # Saga orchestration
```

### Separación CQRS
- **Command Side:** Operaciones de escritura (reservas, cancelaciones)
- **Query Side:** Operaciones de lectura (disponibilidad, calendarios, reportes)

## 3. Comandos y Queries Definidos

### Comandos (Write Side)
1. **MakeReservation**
2. **CancelReservation**

### Queries (Read Side)
1. **Calendarios precalculados**
2. **Disponibilidad en tiempo real**
3. **Reportes de ocupación**

## 4. Flujos de Endpoints

### 4.1 Comando: MakeReservation
**Endpoint:** `POST /api/reservations`

**Flujo:**
1. **Router** → Recibe request con datos de reserva
2. **Controller** → Valida payload y delega a service
3. **Service** → Inicia saga de reserva
4. **Saga Steps:**
   - Verificar disponibilidad
   - Bloquear recurso temporalmente
   - Validar datos del cliente
   - Confirmar reserva
   - Enviar eventos via RabbitMQ
5. **Repository** → Persiste cambios en BD
6. **Response** → Estado de la reserva iniciada

**Eventos generados:**
- `ReservationRequested`
- `ResourceBlocked`
- `ReservationConfirmed`
- `ReservationFailed`

### 4.2 Comando: CancelReservation
**Endpoint:** `DELETE /api/reservations/:id`

**Flujo:**
1. **Router** → Recibe request con ID de reserva
2. **Controller** → Valida ID y delega a service
3. **Service** → Inicia saga de cancelación
4. **Saga Steps:**
   - Verificar existencia de reserva
   - Validar permisos de cancelación
   - Liberar recurso
   - Procesar cancelación
   - Enviar eventos via RabbitMQ
5. **Repository** → Actualiza estado en BD
6. **Response** → Confirmación de cancelación

**Eventos generados:**
- `CancellationRequested`
- `ResourceReleased`
- `ReservationCancelled`

### 4.3 Query: Calendarios Precalculados
**Endpoint:** `GET /api/calendars/:resourceId`

**Flujo:**
1. **Router** → Recibe request con ID de recurso
2. **Controller** → Valida parámetros
3. **Service** → Consulta vista materializada
4. **Repository** → Acceso directo a tabla optimizada
5. **Response** → Calendario precalculado (ultra-rápido)

**Características:**
- Vista materializada actualizada por eventos
- Sin joins complejos
- Datos desnormalizados para velocidad

### 4.4 Query: Disponibilidad en Tiempo Real
**Endpoint:** `GET /api/availability/:resourceId?date=YYYY-MM-DD`

**Flujo:**
1. **Router** → Recibe request con parámetros
2. **Controller** → Valida fecha y recurso
3. **Service** → Consulta cache + BD optimizada
4. **Repository** → Query específica de disponibilidad
5. **Response** → Slots disponibles instantáneamente

**Optimizaciones:**
- Cache en memoria para consultas frecuentes
- Índices específicos en BD
- Consultas sin locks de escritura

### 4.5 Query: Reportes de Ocupación
**Endpoint:** `GET /api/reports/occupancy?from=DATE&to=DATE`

**Flujo:**
1. **Router** → Recibe request con rango de fechas
2. **Controller** → Valida parámetros de reporte
3. **Service** → Procesa métricas agregadas
4. **Repository** → Consulta vistas especializadas
5. **Response** → Datos de ocupación procesados

**Características:**
- Vistas agregadas por períodos
- Datos precalculados por eventos
- Métricas en tiempo real

## 5. Implementación de Saga Choreography

### Eventos RabbitMQ
- **Exchange:** `reservations.events`
- **Queues:** 
  - `reservation.processing`
  - `calendar.updates`
  - `availability.refresh`

### Compensación de Errores
- Rollback automático en caso de fallas
- Eventos de compensación
- Log de transacciones para auditoria

## 6. Separación Read/Write (CQRS)

### Write Database
- Modelo normalizado
- Transacciones ACID
- Eventos de dominio

### Read Database
- Vistas materializadas
- Datos desnormalizados
- Optimizado para consultas

## 7. Consideraciones de Rendimiento

### Command Side
- Procesamiento asíncrono
- Bloqueos mínimos
- Saga pattern para consistencia

### Query Side
- Cache agresivo
- Índices optimizados
- Vistas precalculadas

---

**Nota para el desarrollador:** Este documento define exactamente los endpoints, flujos y arquitectura a implementar. No modificar tipos de datos ni agregar campos adicionales. Enfocarse únicamente en el backend según las especificaciones.
