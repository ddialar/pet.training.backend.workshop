import { NewPetPayloadSchema } from './pet.schemas'
import { NewPetRequestError } from '@errors'
import { NewPetRequest } from '@types'

export const validateNewPetPayload = (payload: NewPetRequest) => {
  const { error } = NewPetPayloadSchema.validate(payload)
  if (error) {
    const [{ message: errorMessage }] = error.details
    throw new NewPetRequestError(errorMessage)
  }
}
