import { logger } from '@logger'
import { userRequests } from '@orm'
import { mapNewUserFromDomainToModel, mapUserFromModelToDomain } from '@mappers'
import { CreateUserError, RetrieveUserError, UserAlreadyExistsError, UserNotFoundError } from '@errors'
import { NewUserData, UserData, UserWithProfile } from '@types'

export const createUser = async (newUser: NewUserData): Promise<UserWithProfile> => {
  try {
    return mapUserFromModelToDomain(await userRequests.createUser(mapNewUserFromDomainToModel(newUser)))
  } catch (error) {
    logger.error({ method: 'repository createUser', newUser }, 'User creation error')
    throw new CreateUserError((<Error>error).message)
  }
}

export const getUser = async (searchParms: Partial<UserData>): Promise<UserWithProfile | undefined> => {
  try {
    const retrievedUser = await userRequests.getUser(searchParms)

    return retrievedUser ? mapUserFromModelToDomain(retrievedUser) : retrievedUser
  } catch (error) {
    logger.error({ method: 'repository getUser' }, 'Retrieving user error')
    throw new RetrieveUserError((<Error>error).message)
  }
}

export const getAllUsers = async (): Promise<UserWithProfile[]> => {
  try {
    return (await userRequests.getAllUsers()).map(mapUserFromModelToDomain)
  } catch (error) {
    logger.error({ method: 'repository getAllUsers' }, 'Retrieving all users error')
    throw new RetrieveUserError((<Error>error).message)
  }
}

export const findUserAndErrorIfExists = async (query: Partial<UserData>): Promise<void> => {
  const user = await getUser(query)
  if (user) {
    logger.error({ method: 'repository findUserAndErrorIfExists', query }, 'User already exists')
    throw new UserAlreadyExistsError()
  }
}

export const findUserAndErrorIfNotExists = async (query: Partial<UserData>): Promise<UserWithProfile> => {
  const user = await getUser(query)
  if (!user) {
    logger.error({ method: 'repository findUserAndErrorIfNotExists', query }, 'User not found')
    throw new UserNotFoundError()
  }

  return user
}
