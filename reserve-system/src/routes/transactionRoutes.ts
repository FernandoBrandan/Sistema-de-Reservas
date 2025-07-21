
import { Router } from "express"
import { getTransactionStatus, getTransactionEvents, retryTransaction, getFailedTransactions } from "../controllers/transactionController"

const router = Router()
router.get("/:correlationId/status", getTransactionStatus)
router.get("/:correlationId/events", getTransactionEvents)
router.post("/:correlationId/retry", retryTransaction)
router.get("/failed", getFailedTransactions)

export default router