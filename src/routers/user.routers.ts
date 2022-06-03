import { Router } from 'express'
import { userHandlers } from '@handlers'

const userRouters = Router()

userRouters.post('/signin', userHandlers.signin)

// TODO implement the /users route
// userRouters.get('/users', userHandlers.getAllUsers)

export { userRouters }
