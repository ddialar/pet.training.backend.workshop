import { Router } from 'express'
import { petHandlers } from '@handlers'

const petRouters = Router()

petRouters.post('/pets', petHandlers.createPet)
// petRouters.get('/pets', petHandlers.getAllUsers)
// petRouters.get('/pets/:id', petHandlers.getUserById)

export { petRouters }
