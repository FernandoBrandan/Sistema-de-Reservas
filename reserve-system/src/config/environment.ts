
export const config = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://admin:admin@postgres:5432/reservations",
    RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://admin:admin@rabbitmq:5672",
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
    NODE_ENV: process.env.NODE_ENV || "development",
    TRANSACTION_TIMEOUT_MINUTES: parseInt(process.env.TRANSACTION_TIMEOUT_MINUTES || "5"),
    RETRY_ATTEMPTS: parseInt(process.env.RETRY_ATTEMPTS || "3"),
    DEAD_LETTER_RETENTION_DAYS: parseInt(process.env.DEAD_LETTER_RETENTION_DAYS || "7"),
    EVENT_STORE_RETENTION_DAYS: parseInt(process.env.EVENT_STORE_RETENTION_DAYS || "30"),
}   