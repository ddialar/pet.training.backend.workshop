import { logger } from '@logger'
import { hashPassword } from '@services'
import { userRepositories } from '@repositories'
import { SigninRequest, UserData, UserProfileData } from '@types'
import { CreateUserError, CreateUserProfileError, UserAlreadyExistsError } from '@errors'

const findUserAndErrorIfExists = async (query: Partial<UserData>): Promise<void> => {
  const user = await userRepositories.getUser(query)
  if (user) {
    logger.error({ query }, 'User already exists')
    throw new UserAlreadyExistsError()
  }
}

const persistNewUser = async ({ email, password }: Pick<SigninRequest, 'email' | 'password'>): Promise<UserData> => {
  // TODO Hash the password
  const hashedPassword = await hashPassword(password)
  // TODO Create the new user
  const parsedUser = {
    username: email,
    password: hashedPassword
  }

  try {
    return await userRepositories.createUser(parsedUser)
  } catch (error) {
    throw new CreateUserError((<Error>error).message)
  }
}

const persistNewUserProfile = async ({ id }: UserData, { email, firstName, lastName }: Pick<SigninRequest, 'email' | 'firstName' | 'lastName'>): Promise<UserProfileData> => {
  try {
    const parsedUserProfile = {
      email,
      firstName,
      lastName,
      userId: id
    }
    // TODO Persist the user's profile
    return await userRepositories.createProfile(parsedUserProfile)
  } catch (error) {
    throw new CreateUserProfileError((<Error>error).message)
  }
}

export const signin = async ({ email, password, firstName, lastName }: SigninRequest) => {
  logger.info({ method: 'signin controller', email, firstName, lastName }, 'New user signin process started')

  // TODO Check whether the user already exists
  await findUserAndErrorIfExists({ username: email })
  // TODO Persist new user
  const persistedUser = await persistNewUser({ email, password })
  // TODO Create the profile
  await persistNewUserProfile(persistedUser, { email, firstName, lastName })

  logger.info({ method: 'signin controller', email }, 'New user and profile successfully created')
}
