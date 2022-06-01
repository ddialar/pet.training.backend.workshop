import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Wrong password error'

export class CheckingPasswordError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
