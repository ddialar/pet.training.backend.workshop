import Joi from 'joi'
import { LoginRequest } from '@types'

export const LoginPayloadSchema = Joi.object<LoginRequest, true, LoginRequest>({
  username: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9.:\-_$]{8,}$/).required()
}).unknown(false)
