import Joi from 'joi'
import { PLAIN_PASSWORD_REGEX } from '@constants'
import { SigninRequest } from '@types'

export const SigninPayloadSchema = Joi.object<SigninRequest, true, SigninRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PLAIN_PASSWORD_REGEX).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
}).unknown(false)
