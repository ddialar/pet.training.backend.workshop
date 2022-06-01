import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { NOT_FOUND } = StatusCodes
const message = 'User not found'

export class UserNotFoundError extends ApiError {
  constructor (description?: string) {
    super(NOT_FOUND, message, description)
  }
}
