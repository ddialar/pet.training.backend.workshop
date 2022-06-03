import Joi from 'joi'
import { PLAIN_PASSWORD_REGEX } from '@constants'
import { LoginRequest } from '@types'

export const LoginPayloadSchema = Joi.object<LoginRequest, true, LoginRequest>({
  username: Joi.string().email().required(),
  password: Joi.string().regex(PLAIN_PASSWORD_REGEX).required()
}).unknown(false)
