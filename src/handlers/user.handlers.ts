import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidators } from '@validators'
import { userControllers } from '@controllers'

const { OK, CREATED } = StatusCodes

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    userValidators.validateSigninPayload(req.body)
    const user = await userControllers.signin(req.body)
    res.status(CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userControllers.getAllUsers()
    res.status(OK).json(users)
  } catch (error) {
    next(error)
  }
}
