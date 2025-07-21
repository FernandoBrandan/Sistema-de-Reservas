
// import { Request, Response } from "express"
// import * as reportService from "../services/reportService"
// import { successResponse } from "../utils/success"
// import { errorResponse } from "../utils/error"



// export const getOccupancyReport = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { startDate, endDate, resourceType } = req.query

//         if (!startDate || !endDate) {
//             res.status(400).json(errorResponse("startDate and endDate are required", 400))
//             return
//         }

//         const report = await reportService.getOccupancyReport({
//             startDate: startDate as string,
//             endDate: endDate as string,
//             resourceType: resourceType as string,
//         })

//         res.status(200).json(successResponse(report, "Occupancy report retrieved successfully"))
//     } catch (error) {
//         console.error("Error in getOccupancyReport:", error)
//         res.status(500).json(errorResponse("Internal server error", 500))
//     }
// }