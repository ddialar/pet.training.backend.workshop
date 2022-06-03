import { connect } from '../connection'
import { UserModel, UserProfileModel } from '../models'
import { NewUserWithProfile, UserData, UserWithProfile } from '@types'

export const createUser = async (userData: NewUserWithProfile): Promise<UserWithProfile> => {
  await connect()
  return (await UserModel.create(
    userData,
    { include: [UserProfileModel] }
  )).get({ plain: true }) as UserWithProfile
}

export const getUser = async (searchParams: Partial<UserData>): Promise<UserWithProfile | undefined> => {
  await connect()
  const query = {
    where: searchParams,
    include: [UserProfileModel]
  }
  // return (await UserModel.findOne(query))?.get({ plain: true }) as UserWithProfile
  return (await UserModel.findOne(query))?.get({ plain: true }) as UserWithProfile
}

export const getAllUsers = async (): Promise<UserWithProfile[]> => {
  await connect()
  return <(UserWithProfile)[]>(await UserModel.findAll({
    include: [UserProfileModel]
  })).map(user => user.get({ plain: true })) || []
}
