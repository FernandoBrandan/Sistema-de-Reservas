import { TransactionContext } from "../models/transactionModel"
import { ITransactionContext, TransactionStatus } from "../interfaces/transactionInterface"

export const create = async (transaction: Omit<ITransactionContext, "createdAt" | "updatedAt">): Promise<ITransactionContext> => {
    return await TransactionContext.create(transaction)
}

export const updateStatus = async (correlationId: string, status: string): Promise<boolean> => {
    const transaction = await TransactionContext.findOne({ where: { correlationId } })
    if (!transaction) throw new Error(`Transaction with correlationId ${correlationId} not found`)
    transaction.status = status as TransactionStatus
    const updatedTransaction = await transaction.save()
    return updatedTransaction.status === status
}

export const findByCorrelationId = async (correlationId: string): Promise<ITransactionContext | null> => {
    return await TransactionContext.findOne({ where: { correlationId } })
}

export const findFailedTransactions = async (): Promise<ITransactionContext[]> => {
    return await TransactionContext.findAll({ where: { status: TransactionStatus.FAILED } })
} 