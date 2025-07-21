// services/calendarService.ts - Sin modelo Sequelize
import { sequelize } from "../config/database"
import { ICalendarQuery } from "../interfaces/dtoInterface"
import { QueryTypes } from "sequelize"

interface CalendarViewResult {
    resource_id: string
    resource_name: string
    reservation_id: string
    user_id: string
    user_name: string
    start_date: Date
    end_date: Date
    status: string
    correlation_id: string
    reservation_date: string
}

export const getCalendar = async (query: ICalendarQuery) => {
    const { resourceId, startDate, endDate } = query

    try {
        let sqlQuery = `
            SELECT resource_id, resource_name, reservation_id,
                user_id, user_name, start_date, end_date, status,
                correlation_id, reservation_date
            FROM calendar_view
            -- WHERE reservation_date BETWEEN :startDate AND :endDate            
               WHERE reservation_date >= :startDate::date AND reservation_date <= :endDate::date
        `

        const replacements: any = { startDate, endDate }

        if (resourceId) {
            sqlQuery += ` AND resource_id = :resourceId`
            replacements.resourceId = resourceId
        }

        sqlQuery += ` ORDER BY resource_id ASC, start_date ASC`

        const results = await sequelize.query<CalendarViewResult>(sqlQuery, {
            replacements,
            type: QueryTypes.SELECT
        })

        console.log(results)

        const resourceMap = new Map()

        results.forEach((row) => {
            const resourceId = row.resource_id

            if (!resourceMap.has(resourceId)) {
                resourceMap.set(resourceId, {
                    resourceId: resourceId,
                    resourceName: row.resource_name,
                    reservations: []
                })
            }

            resourceMap.get(resourceId).reservations.push({
                id: row.reservation_id,
                userId: row.user_id,
                userName: row.user_name,
                startDate: new Date(row.start_date).toISOString(),
                endDate: new Date(row.end_date).toISOString(),
                status: row.status,
                correlationId: row.correlation_id
            })
        })

        return {
            resources: Array.from(resourceMap.values())
        }

    } catch (error) {
        console.error('Error consultando calendar_view:', error)
        throw error
    }
}

export const checkViewExists = async (): Promise<boolean> => {
    try {
        const result = await sequelize.query(
            "SELECT viewname FROM pg_views WHERE viewname = 'calendar_view'",
            { type: QueryTypes.SELECT }
        )
        return result.length > 0
    } catch (error) {
        console.error('Error verificando vista:', error)
        return false
    }
}


// DROP VIEW IF EXISTS calendar_view;

// CREATE VIEW calendar_view AS 
// SELECT 
//     r.resource_id,
//     res.name as resource_name,
//     r.id as reservation_id,
//     r.user_id,
//     u.name as user_name,
//     r.start_date,
//     r.end_date,
//     r.status,
//     r.correlation_id,
//     DATE(r.start_date) as reservation_date
// FROM reservations r
// JOIN resources res ON r.resource_id::uuid = res.id
// JOIN users u ON r.user_id::uuid = u.id
// WHERE r.status != 'CANCELLED';

//  select * from calendar_view
// SELECT viewname FROM pg_views WHERE viewname = 'calendar_view';
// SELECT definition FROM pg_views WHERE viewname = 'calendar_view';

