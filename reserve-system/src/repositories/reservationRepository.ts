
import { Reservation } from "../models/reservationModel"
import { IReservation, ReservationStatus } from "../interfaces/reservationInterface"
import { Op } from "sequelize"

export const create = async (reservation: IReservation): Promise<IReservation> => {
    return await Reservation.create(reservation)
}

export const findById = async (id: string): Promise<IReservation | null> => {
    return await Reservation.findByPk(id)
}

export const updateStatus = async (id: string, status: ReservationStatus): Promise<boolean> => {
    const reservation = await Reservation.findByPk(id)
    if (!reservation) throw new Error(`Reservation with id ${id} not found`)
    reservation.status = status as ReservationStatus
    const updatedReservation = await reservation.save()
    return updatedReservation.status === status
}

export const findConflicting = async (resourceId: string, startDate: Date, endDate: Date): Promise<IReservation[]> => {
    return await Reservation.findAll({
        where: {
            resourceId,
            status: {
                [Op.in]: [ReservationStatus.PENDING, ReservationStatus.CONFIRMED],
            },
            [Op.or]: [
                {
                    startDate: { [Op.lte]: startDate },
                    endDate: { [Op.gt]: startDate },
                },
                {
                    startDate: { [Op.lt]: endDate },
                    endDate: { [Op.gte]: endDate },
                },
                {
                    startDate: { [Op.gte]: startDate },
                    endDate: { [Op.lte]: endDate },
                },
            ],
        },
    })
}

export const findByUserId = async (userId: string): Promise<Reservation[]> => {
    return await Reservation.findAll({ where: { userId } })
}

export const findByDateRange = async (startDate: Date, endDate: Date): Promise<Reservation[]> => {
    return await Reservation.findAll({
        where: {
            startDate: { [Op.gte]: startDate },
            endDate: { [Op.lte]: endDate },
        },
    })
} 