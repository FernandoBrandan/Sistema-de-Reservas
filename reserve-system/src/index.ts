import express from 'express'
import cors from 'cors'
import { config } from './config/environment'
import { initDatabase } from './config/database'
import { errorHandler } from './middleware/errorHandler'

import calendarRoute from './routes/calendarRoutes'
import resourceRoutes from './routes/resourceRoutes'
import availabilityRoutes from './routes/availabilityRoutes'
import reportRoutes from './routes/reportRoutes'

import reservationRoutes from './routes/reservationRoutes'
import transactionRoutes from './routes/transactionRoutes'

import userRoutes from './routes/userRoutes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initDatabase()

app.use("/api/calendar", calendarRoute)
app.use("/api/resources", resourceRoutes)
app.use("/api/availability", availabilityRoutes)
app.use("/api/reports", reportRoutes)

app.use("/api/reservations", reservationRoutes)
app.use("/api/transactions", transactionRoutes)

app.use("/api/users", userRoutes)

app.use(errorHandler)

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`, `Environment: ${config.NODE_ENV}`)
})
