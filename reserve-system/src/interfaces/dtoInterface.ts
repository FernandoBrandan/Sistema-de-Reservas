
export interface IAvailabilityQuery {
    resourceId: string
    date: string
}

export interface ICalendarQuery {
    resourceId?: string
    startDate: string
    endDate: string
}

export interface IOccupancyReportQuery {
    startDate: string
    endDate: string
    resourceType?: string
}