import { logger } from '@logger'
import { userRequests } from '@orm'
import { mapUserFromModelToDomain } from '@mappers'
import { CreateUserError, CreateUserProfileError, RetrieveUserError, UserAlreadyExistsError, UserNotFoundError } from '@errors'
import { NewUserData, UserData, UserProfileData, UserProfiledData } from '@types'

export const createUser = async (newUser: NewUserData): Promise<UserData> => {
  try {
    return await userRequests.createUser(newUser)
  } catch (error) {
    logger.error({ method: 'repository createUser', newUser }, 'User creation error')
    throw new CreateUserError((<Error>error).message)
  }
}

export const createProfile = async (newUserProfile: UserProfileData): Promise<UserProfileData> => {
  try {
    return await userRequests.createUserProfile(newUserProfile)
  } catch (error) {
    logger.error({ method: 'repository createProfile', newUserProfile }, 'User profile creation error')
    throw new CreateUserProfileError((<Error>error).message)
  }
}

export const getUser = async (searchParms: Partial<UserData>): Promise<UserProfiledData | undefined> => {
  try {
    const retrievedUser = await userRequests.getUser(searchParms)

    return retrievedUser ? mapUserFromModelToDomain(retrievedUser) : retrievedUser
  } catch (error) {
    logger.error({ method: 'repository getUser' }, 'Retrieving user error')
    throw new RetrieveUserError((<Error>error).message)
  }
}

export const getAllUsers = async (): Promise<UserProfiledData[]> => {
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

export const findUserAndErrorIfNotExists = async (query: Partial<UserData>): Promise<UserProfiledData> => {
  const user = await getUser(query)
  if (!user) {
    logger.error({ method: 'repository findUserAndErrorIfNotExists', query }, 'User not found')
    throw new UserNotFoundError()
  }

  return user
}
