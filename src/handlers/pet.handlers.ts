import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { petValidators } from '@validators'
import { petControllers } from '@controllers'

const { OK, CREATED } = StatusCodes

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    petValidators.validateNewPetPayload(req.body)
    const user = await petControllers.createPet(req.body)
    res.status(CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

export const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await petControllers.getAllPets()
    res.status(OK).json(user)
  } catch (error) {
    next(error)
  }
}
