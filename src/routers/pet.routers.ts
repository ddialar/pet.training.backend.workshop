import { Router } from 'express'
import { petHandlers } from '@handlers'

const petRouters = Router()

petRouters.post('/pets', petHandlers.createPet)
petRouters.get('/pets', petHandlers.getAllPets)
// petRouters.get('/pets/:id', petHandlers.getUserById)

export { petRouters }
