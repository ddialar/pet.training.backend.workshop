import { Router } from 'express'
import { userHandlers } from '@handlers'

const userRouters = Router()

userRouters.post('/signin', userHandlers.signin)

userRouters.get('/users', userHandlers.getAllUsers)
userRouters.get('/users/:id', userHandlers.getUserById)

export { userRouters }
