import { Router } from 'express'
import { petHandlers } from '@handlers'

const petRouters = Router()

petRouters.post('/pets', petHandlers.createPet)
// TODO implement the /pets
// petRouters.get('/pets', petHandlers.getAllPets)

export { petRouters }
