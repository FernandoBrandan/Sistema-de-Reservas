
export const QUEUES = {
    RESERVATION_REQUESTED: "reservation.requested",
    AVAILABILITY_CHECKED: "availability.checked",
    RESOURCE_BLOCKED: "resource.blocked",
    RESERVATION_CONFIRMED: "reservation.confirmed",
    RESERVATION_REJECTED: "reservation.rejected",
    CANCELLATION_REQUESTED: "cancellation.requested",
    RESOURCE_RELEASED: "resource.released",
    CANCELLATION_CONFIRMED: "cancellation.confirmed",
    TRANSACTION_TIMEOUT: "transaction.timeout",
    SERVICE_FAILED: "service.failed",
}

export const EXCHANGES = {
    RESERVATION_EVENTS: "reservation.events",
}

export const DEAD_LETTER_QUEUES = {
    RESERVATION_DLQ: "reservation.dlq",
    AVAILABILITY_DLQ: "availability.dlq",
    NOTIFICATION_DLQ: "notification.dlq",
}