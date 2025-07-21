
import { Router } from "express"
const router = Router()

import { getCalendar } from "../controllers/calendarController"
router.get("/", getCalendar)

export default router