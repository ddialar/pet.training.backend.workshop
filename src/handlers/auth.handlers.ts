import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authValidators } from '@validators'
import { authControllers } from '@controllers'

const { OK } = StatusCodes

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    authValidators.validateLoginPayload(req.body)
    const authData = await authControllers.login(req.body)
    res.status(OK).json(authData)
  } catch (error) {
    next(error)
  }
}
