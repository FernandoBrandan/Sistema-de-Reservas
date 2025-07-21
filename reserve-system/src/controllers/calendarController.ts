
import { Request, Response } from "express"
import * as calendarService from "../services/calendarService"
import { successResponse } from "../utils/success"
import { errorResponse } from "../utils/error"


export const getCalendar = async (req: Request, res: Response): Promise<void> => {
    try {
        const { resourceId, startDate, endDate } = req.query

        if (!startDate || !endDate) {
            res.status(400).json(errorResponse("startDate and endDate are required", 400))
            return
        }

        const calendar = await calendarService.getCalendar({
            resourceId: resourceId as string,
            startDate: startDate as string,
            endDate: endDate as string,
        })

        res.status(200).json(successResponse(calendar, "Calendar retrieved successfully"))
    } catch (error) {
        console.error("Error in getCalendar:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
} 