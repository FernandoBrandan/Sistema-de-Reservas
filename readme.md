# Sistema de Reservas de Recursos

Este es un sistema digital que permite a los usuarios **reservar recursos** (como salas de reuniones, equipos, vehículos, etc.) de manera organizada y eficiente.

## Características Principales

### Cliente

- ✅ Reservas rápidas y sin conflictos
- ✅ Confirmación inmediata
- ✅ Cancelación flexible
- ✅ Seguimiento en tiempo real

### Administrador

- ✅ Mejor aprovechamiento de recursos
- ✅ Reducción de conflictos
- ✅ Historial completo de uso
- ✅ Automatización de procesos

## Funcionalidades Principales

### 1. **Consultar Disponibilidad**

Te permite ver qué horarios están libres para usar un recurso específico.

- Seleccionas el recurso que necesitas (ej: "Sala de Juntas A")
- Eliges la fecha que te interesa
- El sistema te muestra los horarios disponibles y ocupados

```
Recurso: Sala de Reuniones 1
Fecha: 15 de Enero 2024

✅ Disponible: 9:00-10:00, 11:00-12:00, 14:00-15:00
❌ Ocupado: 10:00-11:00, 13:00-14:00
```

### 2. **Hacer Reservas**

Te permite apartar un recurso para un horario específico.

- Eliges el recurso que necesitas
- Seleccionas la fecha y horario
- El sistema verifica que esté disponible
- Si está libre, confirma tu reserva
- Si está ocupado, te avisa del conflicto

**Información que necesitas proporcionar:**

- ¿Qué recurso necesitas?
- ¿Cuándo lo necesitas? (fecha y hora de inicio)
- ¿Hasta cuándo lo vas a usar? (fecha y hora de fin)
- Tu identificación de usuario

### 3. **Cancelar Reservas**

Te permite liberar una reserva que ya no necesitas.

- Buscas tu reserva existente
- Solicitas la cancelación
- El sistema verifica que sea tu reserva
- Libera el horario para otros usuarios

### 4. **Consultar Reservas**

Te permite ver los detalles de una reserva específica.

- Proporcionas el número de reserva
- El sistema te muestra toda la información: fechas, horarios, estado, etc.

## Estados de las Reservas

Tu reserva puede estar en diferentes estados:

| Estado         | Descripcion                          | ¿Qué hacer?                                    |
| -------------- | ------------------------------------ | ---------------------------------------------- |
| **CONFIRMADA** | Tu reserva está activa y garantizada | Puedes usar el recurso en el horario reservado |
| **PENDIENTE**  | Esperando confirmación del sistema   | Esperar confirmación automática                |
| **CANCELADA**  | La reserva fue cancelada             | El recurso ya no está apartado para ti         |
| **EXPIRADA**   | La reserva venció sin ser usada      | Necesitas hacer una nueva reserva              |

## Seguimiento de Operaciones

Cada vez que haces una reserva, el sistema genera un **código único** (como un número de confirmación) que te permite:

- Rastrear el estado de tu solicitud
- Ver si hubo algún problema
- Revisar el historial de cambios

### Estados de las Operaciones

- **EN PROGRESO**: Tu solicitud se está procesando
- **COMPLETADA**: Todo salió bien
- **FALLIDA**: Hubo un problema (ej: conflicto de horario)
- **EXPIRADA**: La operación tardó demasiado tiempo

## Otras funcionalidades

### 1. **Calendario Integrado**

- Verás todas las reservas en formato de calendario
- Podrás filtrar por tipo de recurso
- Vista mensual, semanal o diaria

### 2. **Reportes de Uso** _(Próximamente)_

- Estadísticas de qué recursos se usan más
- Horarios más demandados
- Métricas de ocupación

### 3. **Reintento Automático**

- Si una operación falla, el sistema puede intentar nuevamente
- Útil para problemas temporales de conectividad

## Reglas y Validaciones

- No puedes reservar en el pasado
- No se permiten conflictos
- Límite de tiempo
- Solo puedes cancelar tus propias reservas

## Horarios de Disponibilidad

- **Lunes a Viernes**: 9:00 AM - 6:00 PM
- **Reservas por horas**: Cada slot dura 1 hora
- **Horarios disponibles**: 9:00-10:00, 10:00-11:00, ..., 17:00-18:00

_Nota: Estos horarios pueden variar según la configuración._

## Resolución de Problemas Comunes

### **Problema**: "No puedo hacer la reserva"

| **Posibles causas:**                      | **Solución:**                                     |
| ----------------------------------------- | ------------------------------------------------- |
| El horario ya está ocupado                | Verifica la disponibilidad primero                |
| Estás intentando reservar en el pasado    | Elige un horario diferente                        |
| El recurso no existe o no está disponible | Contacta al administrador si el problema persiste |

### **Problema**: "Mi reserva dice 'FALLIDA'"

| **Posibles causas:**              | **Solución:**                                     |
| --------------------------------- | ------------------------------------------------- |
| Conflicto con otra reserva        | Revisa el código de seguimiento para más detalles |
| Problema temporal del sistema     | Intenta hacer la reserva nuevamente               |
| Datos incorrectos en la solicitud | Elige un horario diferente                        |

### **Problema**: "No encuentro mi reserva"

| **Posibles causas:**         | **Solución:**                      |
| ---------------------------- | ---------------------------------- |
| Código de reserva incorrecto | Verifica el código de confirmación |
| La reserva fue cancelada     | Revisa tu historial de reservas    |
| Error en el sistema          | Contacta soporte técnico           |

## 📞 Soporte y Ayuda

### ¿Cuándo contactar soporte?

- Problemas técnicos persistentes
- Errores en reservas confirmadas
- Necesitas ayuda con funcionalidades específicas
- Reportar problemas del sistema

### Información útil para proporcionar:

- Código de seguimiento de tu operación
- Horario y fecha de la reserva
- Descripción detallada del problema
- Capturas de pantalla si es posible

## Operaciones

| **Quiero...**       | **Qué hacer**            | **Información necesaria**      |
| ------------------- | ------------------------ | ------------------------------ |
| Ver disponibilidad  | Consultar disponibilidad | Recurso + Fecha                |
| Hacer reserva       | Crear reserva            | Recurso + Fecha/Hora + Usuario |
| Cancelar reserva    | Cancelar reserva         | Código de reserva + Usuario    |
| Ver mi reserva      | Consultar reserva        | Código de reserva              |
| Verificar operación | Consultar transacción    | Código de seguimiento          |
