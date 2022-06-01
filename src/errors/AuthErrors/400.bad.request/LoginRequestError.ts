import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Login payload error'

export class LoginRequestError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
