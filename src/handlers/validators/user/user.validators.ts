import { SigninPayloadSchema } from './user.schemas'
import { SigninRequestError } from '@errors'
import { SigninRequest } from '@types'

export const validateSigninPayload = (payload: SigninRequest) => {
  const { error } = SigninPayloadSchema.validate(payload)
  if (error) {
    const [{ message: errorMessage }] = error.details
    throw new SigninRequestError(errorMessage)
  }
}
