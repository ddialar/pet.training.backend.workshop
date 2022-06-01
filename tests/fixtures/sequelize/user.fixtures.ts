import { hash } from 'bcrypt'
import { connect } from '@orm'
import { UserModel } from '@ormSequelizeModels'
import { logger } from '@logger'
import { NewUserData } from '@types'
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

export const createUserFixture = async (userData: NewUserData) => {
  const parsedUserData = {
    ...userData,
    password: await hash(userData.password, BCRYPT_SALT)
  }

  await connect()
  return (await UserModel.create(parsedUserData)).get({ plain: true })
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
