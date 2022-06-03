import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { commonValidators, petValidators } from '@validators'
import { petControllers } from '@controllers'

const { OK, CREATED } = StatusCodes

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    petValidators.validateNewPetPayload(req.body)
    const result = await petControllers.createPet(req.body)
    res.status(CREATED).json(result)
  } catch (error) {
    next(error)
  }
}

export const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    commonValidators.validateIdParam(req.params.id)
    const result = await petControllers.getPetById(req.params.id)
    res.status(OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await petControllers.getAllPets()
    res.status(OK).json(result)
  } catch (error) {
    next(error)
  }
}
