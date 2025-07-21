# Sistema de Reservas de Recursos

## Manual del Usuario - Guía Completa

### ¿Qué es este Sistema?

Este es un sistema digital que permite a los usuarios **reservar recursos** (como salas de reuniones, equipos, vehículos, etc.) de manera organizada y eficiente. Funciona como un calendario inteligente que evita conflictos y mantiene todo organizado.

---

## 🎯 Funcionalidades Principales

### 1. **Consultar Disponibilidad**

**¿Qué hace?** Te permite ver qué horarios están libres para usar un recurso específico.

**¿Cómo funciona?**

- Seleccionas el recurso que necesitas (ej: "Sala de Juntas A")
- Eliges la fecha que te interesa
- El sistema te muestra los horarios disponibles y ocupados

**Ejemplo práctico:**

```
Recurso: Sala de Reuniones 1
Fecha: 15 de Enero 2024

✅ Disponible: 9:00-10:00, 11:00-12:00, 14:00-15:00
❌ Ocupado: 10:00-11:00, 13:00-14:00
```

### 2. **Hacer Reservas**

**¿Qué hace?** Te permite apartar un recurso para un horario específico.

**¿Cómo funciona?**

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

**¿Qué hace?** Te permite liberar una reserva que ya no necesitas.

**¿Cómo funciona?**

- Buscas tu reserva existente
- Solicitas la cancelación
- El sistema verifica que sea tu reserva
- Libera el horario para otros usuarios

### 4. **Consultar Reservas**

**¿Qué hace?** Te permite ver los detalles de una reserva específica.

**¿Cómo funciona?**

- Proporcionas el número de reserva
- El sistema te muestra toda la información: fechas, horarios, estado, etc.

---

## 📊 Estados de las Reservas

Tu reserva puede estar en diferentes estados:

| Estado         | Significado                          | ¿Qué hacer?                                    |
| -------------- | ------------------------------------ | ---------------------------------------------- |
| **CONFIRMADA** | Tu reserva está activa y garantizada | Puedes usar el recurso en el horario reservado |
| **PENDIENTE**  | Esperando confirmación del sistema   | Esperar confirmación automática                |
| **CANCELADA**  | La reserva fue cancelada             | El recurso ya no está apartado para ti         |
| **EXPIRADA**   | La reserva venció sin ser usada      | Necesitas hacer una nueva reserva              |

---

## 🔍 Seguimiento de Operaciones

### ¿Qué es el "Código de Seguimiento"?

Cada vez que haces una reserva, el sistema genera un **código único** (como un número de confirmación) que te permite:

- Rastrear el estado de tu solicitud
- Ver si hubo algún problema
- Revisar el historial de cambios

### Estados de las Operaciones

- **EN PROGRESO**: Tu solicitud se está procesando
- **COMPLETADA**: Todo salió bien
- **FALLIDA**: Hubo un problema (ej: conflicto de horario)
- **EXPIRADA**: La operación tardó demasiado tiempo

---

## ⚡ Funcionalidades Avanzadas

### 1. **Calendario Integrado** _(Próximamente)_

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

---

## 🛡️ Reglas y Validaciones

### Reglas Automáticas que Aplica el Sistema:

1. **No puedes reservar en el pasado**

   - Solo se permiten reservas para fechas futuras

2. **La hora de inicio debe ser antes que la de fin**

   - Lógica básica: no puedes terminar antes de empezar

3. **No se permiten conflictos**

   - Si alguien ya reservó ese horario, no podrás tomarlo

4. **Límite de tiempo**

   - Las reservas tienen un tiempo límite para procesarse (5 minutos)

5. **Solo puedes cancelar tus propias reservas**
   - Seguridad: no puedes cancelar reservas de otros usuarios

---

## 📋 Horarios de Disponibilidad

**Horarios Estándar del Sistema:**

- **Lunes a Viernes**: 9:00 AM - 6:00 PM
- **Reservas por horas**: Cada slot dura 1 hora
- **Horarios disponibles**: 9:00-10:00, 10:00-11:00, ..., 17:00-18:00

_Nota: Estos horarios pueden variar según la configuración de tu organización._

---

## 🔧 Resolución de Problemas Comunes

### **Problema**: "No puedo hacer la reserva"

**Posibles causas:**

- El horario ya está ocupado
- Estás intentando reservar en el pasado
- El recurso no existe o no está disponible

**Solución:**

- Verifica la disponibilidad primero
- Elige un horario diferente
- Contacta al administrador si el problema persiste

### **Problema**: "Mi reserva dice 'FALLIDA'"

**Posibles causas:**

- Conflicto con otra reserva
- Problema temporal del sistema
- Datos incorrectos en la solicitud

**Solución:**

- Revisa el código de seguimiento para más detalles
- Intenta hacer la reserva nuevamente
- Elige un horario diferente

### **Problema**: "No encuentro mi reserva"

**Posibles causas:**

- Código de reserva incorrecto
- La reserva fue cancelada
- Error en el sistema

**Solución:**

- Verifica el código de confirmación
- Revisa tu historial de reservas
- Contacta soporte técnico

---

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

---

## 🚀 Beneficios del Sistema

### **Para Ti:**

- ✅ Reservas rápidas y sin conflictos
- ✅ Confirmación inmediata
- ✅ Cancelación flexible
- ✅ Seguimiento en tiempo real

### **Para tu Organización:**

- ✅ Mejor aprovechamiento de recursos
- ✅ Reducción de conflictos
- ✅ Historial completo de uso
- ✅ Automatización de procesos

---

## 📝 Resumen de Operaciones

| **Quiero...**       | **Qué hacer**            | **Información necesaria**      |
| ------------------- | ------------------------ | ------------------------------ |
| Ver disponibilidad  | Consultar disponibilidad | Recurso + Fecha                |
| Hacer reserva       | Crear reserva            | Recurso + Fecha/Hora + Usuario |
| Cancelar reserva    | Cancelar reserva         | Código de reserva + Usuario    |
| Ver mi reserva      | Consultar reserva        | Código de reserva              |
| Verificar operación | Consultar transacción    | Código de seguimiento          |

---

_Este sistema está diseñado para ser simple y eficiente. Si tienes preguntas o sugerencias, no dudes en contactar al equipo de soporte._
