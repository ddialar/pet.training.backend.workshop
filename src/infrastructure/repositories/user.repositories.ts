import { userRequests } from '@orm'
import { NewUserData, UserData, UserProfileData } from '@types'

export const createUser = async (newUser: NewUserData): Promise<UserData> =>
  userRequests.createUser(newUser)

export const createProfile = async (newUserProfile: UserProfileData): Promise<UserProfileData> =>
  userRequests.createUserProfile(newUserProfile)

export const getUser = async (searchParms: Partial<UserData>): Promise<UserData | undefined> =>
  userRequests.getUser(searchParms)
