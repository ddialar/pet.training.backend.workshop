import Joi from 'joi'
import { NewPetRequest } from '@types'

export const NewPetPayloadSchema = Joi.object<NewPetRequest, true, NewPetRequest>({
  name: Joi.string().required(),
  birthday: Joi.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T([0-9]{2}:){2}[0-9]{2}\.[0-9]{3}Z$/).required(),
  ownerEmail: Joi.string().email().required()
}).unknown(false)
