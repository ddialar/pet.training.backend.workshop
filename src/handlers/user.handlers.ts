import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidators, commonValidators } from '@validators'
import { userControllers } from '@controllers'

const { OK, CREATED } = StatusCodes

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    userValidators.validateSigninPayload(req.body)
    const result = await userControllers.signin(req.body)
    res.status(CREATED).json(result)
  } catch (error) {
    next(error)
  }
}

// TODO implement the getUserById method
// export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     commonValidators.validateIdParam(req.params.id)
//     const result = await userControllers.getUserById(req.params.id)
//     res.status(OK).json(result)
//   } catch (error) {
//     next(error)
//   }
// }

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userControllers.getAllUsers()
    res.status(OK).json(result)
  } catch (error) {
    next(error)
  }
}
