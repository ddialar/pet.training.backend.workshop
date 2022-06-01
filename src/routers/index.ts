import { Router } from 'express'
import { userRouters } from './user.routers'

const router = Router()

router.use('', userRouters)

export { router }
