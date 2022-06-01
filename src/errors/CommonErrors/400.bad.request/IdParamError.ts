import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Id param not valid error'

export class IdParamError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
