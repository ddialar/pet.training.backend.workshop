import { Router } from 'express'
import { petHandlers } from '@handlers'

const petRouters = Router()

petRouters.post('/pets', petHandlers.createPet)
petRouters.get('/pets', petHandlers.getAllPets)
// TODO implement the /pets/:id router
// petRouters.get('/pets/:id', petHandlers.getPetById)

export { petRouters }
