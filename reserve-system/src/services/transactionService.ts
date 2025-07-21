
import { ITransactionContext } from "interfaces/transactionInterface"
import * as  transactionRepository from "../repositories/transactionRepository"

export const getTransactionStatus = async (correlationId: string): Promise<ITransactionContext | null> => {
    return await transactionRepository.findByCorrelationId(correlationId)
}

export const getTransactionEvents = async (correlationId: string) => {
    //const events = await getEventsByCorrelationId(correlationId) 
}

export const retryTransaction = async (correlationId: string): Promise<{ status: string; message: string }> => {
    const transaction = await transactionRepository.findByCorrelationId(correlationId)

    if (!transaction) {
        return { status: "FAILED", message: "Transaction not found" }
    }

    if (transaction.status !== "FAILED") {
        return { status: "FAILED", message: "Transaction is not in failed state" }
    }

    // Update status to retry
    await transactionRepository.updateStatus(correlationId, "IN_PROGRESS")

    // Republish initial event based on transaction type
    if (transaction.transactionType === "MAKE_RESERVATION") {

    }

    return { status: "SUCCESS", message: "Transaction retry initiated" }
}

export const getFailedTransactions = async (): Promise<ITransactionContext[]> => {
    return await transactionRepository.findFailedTransactions()
}
