import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidators } from '@validators'
import { userControllers } from '@controllers'

const { CREATED } = StatusCodes

// TODO implement the signin method
// export const signin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     userValidators.validateSigninPayload(req.body)
//     const result = await userControllers.signin(req.body)
//     res.status(CREATED).json(result)
//   } catch (error) {
//     next(error)
//   }
// }
