
import { Request, Response } from "express"
import * as transactionService from "../services/transactionService"
import { successResponse } from "../utils/success"
import { errorResponse } from "../utils/error"



export const getTransactionStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { correlationId } = req.params
        const status = await transactionService.getTransactionStatus(correlationId)

        if (status) res.status(200).json(successResponse(status, "Transaction status retrieved"))
        else res.status(404).json(errorResponse("Transaction not found", 404))
    } catch (error) {
        console.error("Error in getTransactionStatus:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}

export const getTransactionEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const { correlationId } = req.params
        const events = await transactionService.getTransactionEvents(correlationId)

        res.status(200).json(successResponse({ correlationId, events }, "Transaction events retrieved"))
    } catch (error) {
        console.error("Error in getTransactionEvents:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}

export const retryTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { correlationId } = req.params
        const result = await transactionService.retryTransaction(correlationId)

        res.status(200).json(successResponse(result, "Transaction retry initiated"))
    } catch (error) {
        console.error("Error in retryTransaction:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}

export const getFailedTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await transactionService.getFailedTransactions()
        res.status(200).json(successResponse({ transactions }, "Failed transactions retrieved"))
    } catch (error) {
        console.error("Error in getFailedTransactions:", error)
        res.status(500).json(errorResponse("Internal server error", 500))
    }
}
