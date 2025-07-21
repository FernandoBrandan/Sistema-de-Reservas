
export const errorResponse = (message: string, statusCode: number, details?: any) => {
    return {
        success: false,
        message,
        statusCode,
        details,
        timestamp: new Date().toISOString(),
    }
}

export class CustomError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.name = "CustomError"
    }
}