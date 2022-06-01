import { hash } from 'bcrypt'
import { connect } from '@orm'
import { UserModel, UserProfileModel } from '@ormSequelizeModels'
import { logger } from '@logger'
import { SigninRequest, UserProfiledData } from '@types'
import { BCRYPT_SALT } from '@config'
// import { UserData } from '@types'

export const cleanUsersDatabaseFixture = async () => {
  try {
    await connect()
    // await UserPetModel.sync({ force: true })
    // await UserProfileModel.sync({ force: true })
    await UserModel.destroy({ truncate: true, cascade: true })
  } catch (error) {
    logger.error({ fromMethod: 'cleanUsersDatabaseFixture', error }, 'Error')
  }
}

export const createUserFixture = async ({ email, firstName, lastName, password }: SigninRequest): Promise<UserProfiledData> => {
  const parsedUserData = {
    username: email,
    password: await hash(password, BCRYPT_SALT)
  }

  await connect()
  const persistedUser = (await UserModel.create(parsedUserData)).get({ plain: true })

  const parsedUserProfileData = {
    firstName,
    lastName,
    email,
    userId: persistedUser.id
  }

  const persistedProfile = (await UserProfileModel.create(parsedUserProfileData)).get({ plain: true })

  return {
    id: persistedUser.id,
    username: persistedUser.username,
    password: persistedUser.password,
    enabled: persistedUser.enabled,
    firstName: persistedProfile.firstName,
    lastName: persistedProfile.lastName
  }
}

// export const getUserFixture = async (searchParams: Partial<UserData>): Promise<UserData | undefined> => {
//   try {
//     await connect()
//     const query = { where: searchParams }
//     return (await UserModel.findOne(query))?.get({ plain: true })
//   } catch (error) {
//     logger.error({ fromMethod: 'getUserFixture', error }, 'Error')
//   }
// }
