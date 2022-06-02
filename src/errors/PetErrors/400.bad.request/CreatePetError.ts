import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { BAD_REQUEST } = StatusCodes
const message = 'Creating new pet error'

export class CreatePetError extends ApiError {
  constructor (description?: string) {
    super(BAD_REQUEST, message, description)
  }
}
