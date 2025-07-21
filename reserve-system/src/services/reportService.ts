// import { sequelize } from "../config/database"
// import { IOccupancyReportQuery } from "../interfaces/dtoInterface"

// export const getOccupancyReport = async (query: IOccupancyReportQuery) => {
//     const { startDate, endDate, resourceType } = query

//     let whereClause = "WHERE res.start_date::date BETWEEN $1 AND $2"
//     let params = [startDate, endDate]

//     if (resourceType) {
//         whereClause += " AND r.type = $3"
//         params.push(resourceType)
//     }

//     const sql = `SELECT 
//             r.id as resource_id,
//             r.name as resource_name,
//             r.type as resource_type,
//             COALESCE(COUNT(res.id), 0) as total_reservations,
//             COALESCE(SUM(EXTRACT(EPOCH FROM (res.end_date - res.start_date)) / 3600), 0) as total_hours,
//             COALESCE(SUM(EXTRACT(EPOCH FROM (res.end_date - res.start_date)) / 3600)
//             / (EXTRACT(EPOCH FROM ($2::timestamp - $1::timestamp)) / 3600) * 100,0) as occupancy_rate
//         FROM resources r
//         LEFT JOIN reservations res ON r.id = res.resource_id 
//             AND res.start_date::date BETWEEN $1 AND $2
//             AND res.status NOT IN ('cancelled', 'rejected')
//         GROUP BY r.id, r.name, r.type
//         ORDER BY total_reservations DESC    `

//     const result = await pool.query(sql, params)

//     const resourceMetrics = result.rows.map((row: IResource) => ({
//         resourceId: row.resource_id,
//         resourceName: row.resource_name,
//         resourceType: row.resource_type,
//         totalReservations: parseInt(row.total_reservations),
//         totalHours: parseFloat(row.total_hours),
//         occupancyRate: parseFloat(row.occupancy_rate),
//     }))

//     const summary = {
//         totalReservations: resourceMetrics.reduce((sum, r) => sum + r.totalReservations, 0),
//         totalHours: resourceMetrics.reduce((sum, r) => sum + r.totalHours, 0),
//         averageOccupancy: resourceMetrics.length > 0
//             ? resourceMetrics.reduce((sum, r) => sum + r.occupancyRate, 0) / resourceMetrics.length
//             : 0,
//     }

//     return {
//         period: { startDate, endDate },
//         summary,
//         resourceMetrics,
//     }
// }