import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Retrieving user error'

export class RetrieveUserError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
