import { hash } from 'bcrypt'
import { connect, userRequests } from '@orm'
import { UserModel, UserProfileModel } from '@ormSequelizeModels'
import { logger } from '@logger'
import { BCRYPT_SALT } from '@config'
import { SigninRequest, UserWithProfile } from '@types'

export const cleanUsersDatabaseFixture = async () => {
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
  const rawPersistedUser = (await UserModel.create(
    parsedUserData,
    { include: [UserProfileModel] }
  )).get({ plain: true }) as userRequests.UserWithProfileDatabase

  return {
    id: rawPersistedUser.id,
    username: rawPersistedUser.username,
    password: rawPersistedUser.password,
    firstName: rawPersistedUser.profile.firstName,
    lastName: rawPersistedUser.profile.lastName,
    enabled: rawPersistedUser.enabled
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
