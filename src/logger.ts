import pino from 'pino'
import { SERVICE_NAME, LOG_LEVEL } from '@config'

export const logger = pino({
  name: SERVICE_NAME,
  level: LOG_LEVEL
})
