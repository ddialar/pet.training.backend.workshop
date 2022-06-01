import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { UNAUTHORIZED } = StatusCodes
const message = 'Token expired'

export class TokenExpiredError extends ApiError {
  constructor (description?: string) {
    super(UNAUTHORIZED, message, description)
  }
}
