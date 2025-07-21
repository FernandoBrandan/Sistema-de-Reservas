import { Router } from "express"

import { createReservation, cancelReservation, getReservation } from "../controllers/reservationController"

import { validateReservation } from "../middleware/validation"
import { correlationIdMiddleware } from "../middleware/correlationId"

const router = Router()

router.post("/", correlationIdMiddleware, validateReservation, createReservation)
router.delete("/:reservationId", correlationIdMiddleware, cancelReservation)
router.get("/:reservationId", getReservation)

export default router