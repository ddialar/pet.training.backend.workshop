import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { petValidators } from '@validators'
import { petControllers } from '@controllers'

const { CREATED } = StatusCodes

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    petValidators.validateNewPetPayload(req.body)
    const result = await petControllers.createPet(req.body)
    res.status(CREATED).json(result)
  } catch (error) {
    next(error)
  }
}

// TODO implement the getAllPets method
// export const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await petControllers.getAllPets()
//     res.status(OK).json(result)
//   } catch (error) {
//     next(error)
//   }
// }
