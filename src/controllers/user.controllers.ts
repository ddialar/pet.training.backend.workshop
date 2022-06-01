import { logger } from '@logger'
import { hashPassword } from '@services'
import { userRepositories } from '@repositories'
import { SigninRequest, UserData, UserProfileData } from '@types'

const persistNewUser = async ({ email, password }: Pick<SigninRequest, 'email' | 'password'>): Promise<UserData> => {
  // TODO Hash the password
  const hashedPassword = await hashPassword(password)
  // TODO Create the new user
  const parsedUser = {
    username: email,
    password: hashedPassword
  }

  return await userRepositories.createUser(parsedUser)
}

const persistNewUserProfile = async ({ id }: UserData, { email, firstName, lastName }: Pick<SigninRequest, 'email' | 'firstName' | 'lastName'>): Promise<UserProfileData> => {
  const parsedUserProfile = {
    email,
    firstName,
    lastName,
    userId: id
  }
  // TODO Persist the user's profile
  return await userRepositories.createProfile(parsedUserProfile)
}

export const signin = async ({ email, password, firstName, lastName }: SigninRequest) => {
  logger.info({ method: 'signin controller', email, firstName, lastName }, 'New user signin process started')

  // TODO Check whether the user already exists
  await userRepositories.findUserAndErrorIfExists({ username: email })
  // TODO Persist new user
  const persistedUser = await persistNewUser({ email, password })
  // TODO Create the profile
  await persistNewUserProfile(persistedUser, { email, firstName, lastName })

  logger.info({ method: 'signin controller', email }, 'New user and profile successfully created')
}
