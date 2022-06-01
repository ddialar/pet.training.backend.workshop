import { Router } from 'express'
import { authHandlers } from '@handlers'

const authRouters = Router()

authRouters.post('/login', authHandlers.login)

export { authRouters }
