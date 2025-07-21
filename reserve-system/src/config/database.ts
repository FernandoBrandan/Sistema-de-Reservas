import { config } from "./environment"
import { Sequelize } from 'sequelize'

const POSTGRE_URI = config.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres_ems'
export const sequelize = new Sequelize(POSTGRE_URI, {
    logging: false,
})


export const initDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexión a la base de datos establecida')

        await import('../models/reservationModel')
        await import('../models/resourceModel')
        await import('../models/transactionModel')
        await import('../models/userModel')
        // await sequelize.sync({ alter: true })
        console.log('Tablas sincronizadas')
        // await import('../models/calendarModel')

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error)
    }
}
