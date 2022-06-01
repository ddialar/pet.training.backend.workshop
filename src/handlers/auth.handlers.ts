import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authValidators } from '@validators'
import { authControllers } from '@controllers'
import { logger } from '@logger'

const { OK } = StatusCodes

export const login = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug({ method: 'handler login' })
  try {
    authValidators.validateLoginPayload(req.body)
    const authData = await authControllers.login(req.body)
    res.status(OK).json(authData)
  } catch (error) {
    logger.error({ method: 'handler login', error })
    next(error)
  }
}
