import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Authentication token generation error'

export class TokenGenerationError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
