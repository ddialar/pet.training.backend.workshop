import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'

const { NOT_FOUND } = StatusCodes
const message = 'Pet not found'

export class PetNotFoundError extends ApiError {
  constructor (description?: string) {
    super(NOT_FOUND, message, description)
  }
}
