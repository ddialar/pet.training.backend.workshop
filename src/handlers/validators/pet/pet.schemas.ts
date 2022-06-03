import Joi from 'joi'
import { DATE_ISO_REGEX } from '@constants'
import { NewPetRequest } from '@types'

export const NewPetPayloadSchema = Joi.object<NewPetRequest, true, NewPetRequest>({
  name: Joi.string().required(),
  birthday: Joi.string().regex(DATE_ISO_REGEX).required(),
  ownerEmail: Joi.string().email().required()
}).unknown(false)
