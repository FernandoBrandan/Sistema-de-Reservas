export interface IReservation {
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

export enum ReservationStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED",
}

export interface ICreateReservationRequest {
    resourceId: string
    userId: string
    startDate: string
    endDate: string
}

export interface ICreateReservationResponse {
    reservationId: string
    correlationId: string
    status: "SUCCESS" | "FAILED"
    message: string
    reservation?: IReservation
}