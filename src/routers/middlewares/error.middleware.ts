import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@errors'
import { logger } from '@logger'

const { INTERNAL_SERVER_ERROR } = StatusCodes

export const handleHttpError = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const { status, message, description } = error

  logger.error({ message, description })

  if (status) {
    res.status(status).json({ message })
  } else {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
  }
}
