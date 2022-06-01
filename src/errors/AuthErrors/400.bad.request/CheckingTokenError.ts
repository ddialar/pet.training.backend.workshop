import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Checking token error'

export class CheckingTokenError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
