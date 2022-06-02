import { connect } from '../connection'
import { UserModel, UserProfileModel } from '../models'
import { UserData, ProfileData } from '@types'

export interface NewUserWithProfileDatabase {
  username: string
  password: string
  profile: {
    firstName: string
    lastName: string
    email: string
  }
}

export interface UserWithProfileDatabase extends UserData {
  profile: ProfileData
}

export const createUser = async (userData: NewUserWithProfileDatabase): Promise<UserWithProfileDatabase> => {
  await connect()
  return (await UserModel.create(
    userData,
    { include: [UserProfileModel] }
  )).get({ plain: true }) as UserWithProfileDatabase
}

export const getUser = async (searchParams: Partial<UserData>): Promise<UserWithProfileDatabase | undefined> => {
  await connect()
  const query = {
    where: searchParams,
    include: [UserProfileModel]
  }
  return (await UserModel.findOne(query))?.get({ plain: true }) as UserWithProfileDatabase
}

export const getAllUsers = async (): Promise<(UserWithProfileDatabase)[]> => {
  await connect()
  return <(UserWithProfileDatabase)[]>(await UserModel.findAll({
    include: [UserProfileModel]
  })).map(user => user.get({ plain: true })) || []
}
