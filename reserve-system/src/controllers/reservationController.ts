
import { Request, Response } from "express"
import * as reservationService from "../services/reservationService"
import { successResponse } from "../utils/success"
import { errorResponse } from "../utils/error"


export const createReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await reservationService.createReservation(req.body)
        if (result.status === "SUCCESS") {
            res.status(201).json(successResponse(result, "Reservation created successfully"))
        } else {
            res.status(400).json(errorResponse(result.message, 400))
        }
    } catch (error) {
        console.error("Error in createReservation:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}

export const cancelReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reservationId } = req.params
        const { userId } = req.body

        const result = await reservationService.cancelReservation(reservationId, userId)

        if (result.success) {
            res.status(200).json(successResponse(result, result.message))
        } else {
            res.status(400).json(errorResponse(result.message, 400))
        }
    } catch (error) {
        console.error("Error in cancelReservation:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}

export const getReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reservationId } = req.params
        res.status(200).json(successResponse({}, "Reservation retrieved successfully"))
    } catch (error) {
        console.error("Error in getReservation:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
} 