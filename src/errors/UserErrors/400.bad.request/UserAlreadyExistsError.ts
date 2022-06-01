import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'User already exists'

export class UserAlreadyExistsError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
