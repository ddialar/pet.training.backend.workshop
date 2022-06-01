import Joi from 'joi'
import { SigninRequest } from '@types'

export const SigninPayloadSchema = Joi.object<SigninRequest, true, SigninRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9.:\-_$]{8,}$/).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
}).unknown(false)
