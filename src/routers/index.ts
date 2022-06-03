import { Router } from 'express'
import { authRouters } from './auth.routers'
import { userRouters } from './user.routers'

const router = Router()

router.use('', authRouters)
router.use('', userRouters)

export { router }
