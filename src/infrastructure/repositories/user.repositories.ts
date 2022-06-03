import { logger } from '@logger'
import { userRequests } from '@orm'
import { mapNewUserFromDomainToModel } from '@mappers'
import { CreateUserError, RetrieveUserError, UserAlreadyExistsError, UserNotFoundError } from '@errors'
import { NewUserData, UserData, UserWithProfile } from '@types'

// TODO implement the createUser method
// export const createUser = async (newUser: NewUserData): Promise<UserWithProfile> => {
//   try {
//     return await userRequests.createUser(mapNewUserFromDomainToModel(newUser))
//   } catch (error) {
//     logger.error({ method: 'repository createUser', newUser }, 'User creation error')
//     throw new CreateUserError((<Error>error).message)
//   }
// }

export const getUser = async (searchParms: Partial<UserData>): Promise<UserWithProfile | undefined> => {
  try {
    return await userRequests.getUser(searchParms)
  } catch (error) {
    logger.error({ method: 'repository getUser' }, 'Retrieving user error')
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
