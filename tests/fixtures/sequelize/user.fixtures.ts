import { hash } from 'bcrypt'
import { connect, UserModel, UserProfileModel } from '@orm'
import { logger } from '@logger'
import { BCRYPT_SALT } from '@config'
import { SigninRequest, UserWithProfile } from '@types'

export const cleanUsersDatabaseFixture = async (): Promise<void> => {
  try {
    await connect()
    await UserModel.destroy({ truncate: true, cascade: true })
  } catch (error) {
    logger.error({ fromMethod: 'cleanUsersDatabaseFixture', error }, 'Error')
  }
}

export const createUserFixture = async ({ email, firstName, lastName, password }: SigninRequest): Promise<UserWithProfile> => {
  const parsedUserData = {
    username: email,
    password: await hash(password, BCRYPT_SALT),
    profile: {
      firstName,
      lastName,
      email
    }
  }

  await connect()
  return (await UserModel.create(
    parsedUserData,
    { include: [UserProfileModel] }
  )).get({ plain: true }) as UserWithProfile
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
