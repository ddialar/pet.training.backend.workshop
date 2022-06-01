import { LoginPayloadSchema } from './auth.schemas'
import { LoginRequestError } from '@errors'
import { LoginRequest } from '@types'

export const validateLoginPayload = (payload: LoginRequest) => {
  const { error } = LoginPayloadSchema.validate(payload)
  if (error) {
    const [{ message: errorMessage }] = error.details
    throw new LoginRequestError(errorMessage)
  }
}
