
import { checkAvailability } from "../controllers/availabilityController"
import { Router } from "express"

const router = Router()

router.get("/:resourceId/:date", checkAvailability)

export default router