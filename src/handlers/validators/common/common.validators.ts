import { idSchema } from './common.schemas'
import { IdParamError } from '@errors'

export const validateIdParam = (payload: string) => {
  const { error } = idSchema.validate(payload)
  if (error) {
    const [{ message: errorMessage }] = error.details
    throw new IdParamError(errorMessage)
  }
}
