import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'New pet payload error'

export class NewPetRequestError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
