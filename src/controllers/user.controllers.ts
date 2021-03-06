import { logger } from '@logger'
import { hashPassword } from '@services'
import { userRepositories } from '@repositories'
import { SigninRequest, UserWithProfile } from '@types'

export const signin = async ({ email, password, firstName, lastName }: SigninRequest): Promise<void> => {
  logger.info({ method: 'signin controller', email, firstName, lastName }, 'New user signin process started')

  // TODO Check whether the user already exists
  await userRepositories.findUserAndErrorIfExists({ username: email })
  // TODO Persist new user
  const hashedPassword = await hashPassword(password)
  await userRepositories.createUser({ email, password: hashedPassword, firstName, lastName })

  logger.info({ method: 'signin controller', email }, 'New user and profile successfully created')
}

export const getUserById = async (id: string): Promise<UserWithProfile> => {
  logger.info({ method: 'getAllUsers controller' }, 'Retrieving registered pet')
  return await userRepositories.findUserAndErrorIfNotExists({ id })
}

export const getAllUsers = async (): Promise<UserWithProfile[]> => {
  logger.info({ method: 'getAllUsers controller' }, 'Retrieving registered users')
  return await userRepositories.getAllUsers()
}
