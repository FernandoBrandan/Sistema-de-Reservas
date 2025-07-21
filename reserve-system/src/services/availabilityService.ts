
import * as reservationRepository from "../repositories/reservationRepository"
import * as resourceRepository from "../repositories/resourceRepository"
import { IAvailabilityQuery } from "../interfaces/dtoInterface"


export const checkAvailability = async (query: IAvailabilityQuery) => {
    const { resourceId, date } = query

    const SLOT_DURATION_MINUTES = 30
    const START_HOUR = 9
    const END_HOUR = 18

    const resource = await resourceRepository.findById(resourceId)
    if (!resource) throw new Error("Resource not found")

    const targetDate = new Date(date)
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    const reservations = await reservationRepository.findConflicting(resourceId, startOfDay, endOfDay)

    const availableSlots = []
    const unavailableSlots = []

    const totalMinutes = (END_HOUR - START_HOUR) * 60

    for (let minutes = 0; minutes < totalMinutes; minutes += SLOT_DURATION_MINUTES) {
        const slotStart = new Date(targetDate)
        slotStart.setHours(START_HOUR, 0, 0, 0)
        slotStart.setMinutes(slotStart.getMinutes() + minutes)

        const slotEnd = new Date(slotStart)
        slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_DURATION_MINUTES)

        if (slotEnd.getHours() >= END_HOUR) break

        const isOccupied = reservations.some((reservation) => {
            return (reservation.startDate <= slotStart && reservation.endDate > slotStart) ||
                (reservation.startDate < slotEnd && reservation.endDate >= slotEnd) ||
                (reservation.startDate >= slotStart && reservation.endDate <= slotEnd)
        })

        const timeSlot = {
            startTime: slotStart.toTimeString().slice(0, 5),
            endTime: slotEnd.toTimeString().slice(0, 5),
        }

        if (isOccupied) {
            unavailableSlots.push(timeSlot)
        } else {
            availableSlots.push(timeSlot)
        }
    }

    return {
        resourceId,
        date,
        slotDuration: SLOT_DURATION_MINUTES,
        workingHours: {
            start: `${START_HOUR.toString().padStart(2, '0')}:00`,
            end: `${END_HOUR.toString().padStart(2, '0')}:00`
        },
        availableSlots,
        unavailableSlots,
    }
}



export const checkAvailability_hourly = async (query: IAvailabilityQuery) => {
    const { resourceId, date } = query

    const resource = await resourceRepository.findById(resourceId)
    if (!resource) throw new Error("Resource not found")

    const targetDate = new Date(date)
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    const reservations = await reservationRepository.findConflicting(resourceId, startOfDay, endOfDay)

    const availableSlots = []
    const unavailableSlots = []

    for (let hour = 9; hour < 18; hour++) {
        const slotStart = new Date(targetDate)
        slotStart.setHours(hour, 0, 0, 0)

        const slotEnd = new Date(targetDate)
        slotEnd.setHours(hour + 1, 0, 0, 0)

        const isOccupied = reservations.some((reservation) => {
            return (reservation.startDate <= slotStart && reservation.endDate > slotStart) ||
                (reservation.startDate < slotEnd && reservation.endDate >= slotEnd) ||
                (reservation.startDate >= slotStart && reservation.endDate <= slotEnd)
        })

        const timeSlot = {
            startTime: slotStart.toTimeString().slice(0, 5),
            endTime: slotEnd.toTimeString().slice(0, 5),
        }

        if (isOccupied) {
            unavailableSlots.push(timeSlot)
        } else {
            availableSlots.push(timeSlot)
        }
    }

    return {
        resourceId,
        date,
        availableSlots,
        unavailableSlots,
    }
}