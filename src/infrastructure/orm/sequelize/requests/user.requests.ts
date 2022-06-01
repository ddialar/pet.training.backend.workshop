import { connect } from '../connection'
import { UserModel, UserProfileModel } from '../models'
import { NewUserData, UserData, UserProfileData } from '@types'

export const createUser = async (userData: NewUserData) => {
  await connect()
  return (await UserModel.create(userData)).get({ plain: true })
}

export const createUserProfile = async (newUserProfile: UserProfileData) => {
  await connect()
  return (await (UserProfileModel.create(newUserProfile))).get({ plain: true })
}

// export const getUser = async (searchParams: Partial<UserData>): Promise<UserData | undefined> => {
//   await connect()
//   const query = { where: searchParams }
//   return (await UserModel.findOne(query))?.get({ plain: true })
// }

export const getUser = async (searchParams: Partial<UserData>): Promise<UserData | undefined> => {
  await connect()
  const query = {
    where: searchParams,
    include: [UserProfileModel]
  }
  return (await UserModel.findOne(query))?.get({ plain: true })
}

export const getAllUsers = async (): Promise<(UserData & { UserProfileModel?: UserProfileData })[]> => {
  await connect()
  return (await UserModel.findAll({
    include: [UserProfileModel]
  })).map(user => user.get({ plain: true })) || []
}
