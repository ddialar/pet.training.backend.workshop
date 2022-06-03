import Joi from 'joi'
import { UUID4_REGEX } from '@constants'

export const idSchema = Joi.string().regex(UUID4_REGEX).required()
