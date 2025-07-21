
import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"
import { errorResponse } from "../utils/error"

export const validateReservation = [
    body("resourceId").isUUID().withMessage("Resource ID must be a valid UUID"),
    body("userId").isUUID().withMessage("User ID must be a valid UUID"),
    body("startDate").isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
    body("endDate").isISO8601().withMessage("End date must be a valid ISO 8601 date"),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errorResponse("Validation errors", 400, errors.array()))
        }
        next()
    },
]