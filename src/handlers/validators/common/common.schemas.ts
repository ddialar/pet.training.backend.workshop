import Joi from 'joi'

export const idSchema = Joi.string().regex(/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/).required()
