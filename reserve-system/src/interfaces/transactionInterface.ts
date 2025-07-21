
export interface ITransactionContext {
    correlationId: string
    transactionType: TransactionType
    status: TransactionStatus
    payload: any
    timeoutAt?: Date
    createdAt: Date
    updatedAt: Date
}


export enum TransactionType {
    MAKE_RESERVATION = "MAKE_RESERVATION",
    CANCEL_RESERVATION = "CANCEL_RESERVATION"
}

export enum TransactionStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    TIMEOUT = "TIMEOUT"
}
