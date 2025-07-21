
import { Request, Response } from "express"
import { successResponse } from "../utils/success"
import { errorResponse } from "../utils/error"

import * as services from "../services/availabilityService"

export const checkAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
        const { resourceId, date } = req.params
        const availability = await services.checkAvailability({ resourceId, date })

        console.log("********")
        console.log(availability)
        console.log("********")

        res.status(200).json(successResponse(availability, "Availability retrieved successfully"))
    } catch (error) {
        console.error("Error in checkAvailability:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}