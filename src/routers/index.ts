import { Router } from 'express'
import { authRouters } from './auth.routers'
import { userRouters } from './user.routers'
import { petRouters } from './pet.routers'

const router = Router()

router.use('', authRouters)
router.use('', userRouters)
router.use('', petRouters)

export { router }
