import { logger } from '@logger'
import { userRequests } from '@orm'
import { CreateUserError, CreateUserProfileError, UserAlreadyExistsError, UserNotFoundError } from '@errors'
import { NewUserData, UserData, UserProfileData } from '@types'

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

export const getUser = async (searchParms: Partial<UserData>): Promise<UserData | undefined> =>
  userRequests.getUser(searchParms)

export const findUserAndErrorIfExists = async (query: Partial<UserData>): Promise<void> => {
  const user = await getUser(query)
  if (user) {
    logger.error({ method: 'repository findUserAndErrorIfExists', query }, 'User already exists')
    throw new UserAlreadyExistsError()
  }
}

export const findUserAndErrorIfNotExists = async (query: Partial<UserData>): Promise<UserData> => {
  const user = await getUser(query)
  if (!user) {
    logger.error({ method: 'repository findUserAndErrorIfNotExists', query }, 'User not found')
    throw new UserNotFoundError()
  }

  return user
}
