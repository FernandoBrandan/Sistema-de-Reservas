
export const successResponse = (data: any, message: string = "Success") => {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
    }
}