
import { v4 as uuidv4 } from "uuid"
export const generateCorrelationId = (): string => { return uuidv4() }
export const generateEventId = (): string => { return uuidv4() }