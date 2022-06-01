import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Creating new user error'

export class CreateUserError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
