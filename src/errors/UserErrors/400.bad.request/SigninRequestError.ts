import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Signin payload error'

export class SigninRequestError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
