
import * as reservationRepository from "../repositories/reservationRepository"
import * as transactionRepository from "../repositories/transactionRepository"
import * as correlationService from "./correlationService"
import { ICreateReservationRequest, ICreateReservationResponse, ReservationStatus } from "../interfaces/reservationInterface"
import { TransactionStatus, TransactionType } from "../interfaces/transactionInterface"

export const createReservation = async (request: ICreateReservationRequest): Promise<ICreateReservationResponse> => {
    try {
        const correlationId = correlationService.generateCorrelationId()
        await transactionRepository.create({
            correlationId,
            transactionType: TransactionType.MAKE_RESERVATION,
            status: TransactionStatus.IN_PROGRESS,
            payload: request,
            timeoutAt: new Date(Date.now() + 5 * 60 * 1000),
        })
        validateReservationRequest(request)

        const conflicts = await reservationRepository.findConflicting(request.resourceId, new Date(request.startDate), new Date(request.endDate))

        if (conflicts.length > 0) {
            await transactionRepository.updateStatus(correlationId, TransactionStatus.FAILED)
            return {
                reservationId: "",
                correlationId,
                status: "FAILED",
                message: "Resource not available for the requested time slot",
            }
        }

        const reservation = await reservationRepository.create({
            resourceId: request.resourceId,
            userId: request.userId,
            startDate: new Date(request.startDate),
            endDate: new Date(request.endDate),
            status: ReservationStatus.CONFIRMED,
            correlationId,
        })

        await transactionRepository.updateStatus(correlationId, TransactionStatus.COMPLETED)

        return {
            reservationId: reservation.id || correlationId,
            correlationId,
            status: "SUCCESS",
            message: "Reservation created successfully",
            reservation,
        }
    } catch (error) {
        console.error("Error creating reservation:", error)
        throw error
    }
}

export const cancelReservation = async (reservationId: string, userId: string): Promise<{ success: boolean; message: string }> => {
    try {
        const reservation = await reservationRepository.findById(reservationId)
        if (!reservation) return { success: false, message: "Reservation not found" }
        if (reservation.userId !== userId) return { success: false, message: "Unauthorized to cancel this reservation" }
        const updated = await reservationRepository.updateStatus(reservationId, ReservationStatus.CANCELLED)
        if (updated) return { success: true, message: "Reservation cancelled successfully" }
        return { success: false, message: "Failed to cancel reservation" }
    } catch (error) {
        console.error("Error cancelling reservation:", error)
        throw error
    }
}

export const validateReservationRequest = (request: ICreateReservationRequest): void => {
    const startDate = new Date(request.startDate)
    const endDate = new Date(request.endDate)
    if (startDate >= endDate) throw new Error("Start date must be before end date")
    if (startDate < new Date()) throw new Error("Start date cannot be in the past")
} 