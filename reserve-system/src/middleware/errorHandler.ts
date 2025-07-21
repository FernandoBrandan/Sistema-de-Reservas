
import { Request, Response, NextFunction } from "express"
import { errorResponse } from "../utils/error"

// export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
export const errorHandler = (error: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
    console.error("Global error handler:", error)

    const statusCode = error.statusCode || 500
    const message = error.message || "Internal server error"

    res.status(statusCode).json(errorResponse(message, statusCode))
}