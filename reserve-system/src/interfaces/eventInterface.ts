export interface IDomainEvent {
        eventId: string
        correlationId: string
        eventType: string
        eventData: any
        metadata?: any
        createdAt: Date
}