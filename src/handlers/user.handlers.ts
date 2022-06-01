import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidators } from '@validators'
import { userControllers } from '@controllers'
import { logger } from '@logger'

const { CREATED } = StatusCodes

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug({ method: 'handler signin' })
  try {
    userValidators.validateSigninPayload(req.body)
    const user = await userControllers.signin(req.body)
    res.status(CREATED).json(user)
  } catch (error) {
    logger.error({ method: 'handler signin', error })
    next(error)
  }
}
