import { connect } from '@orm'
import { UserModel } from '@ormSequelizeModels'
import { logger } from '@logger'
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

// export const getUserFixture = async (searchParams: Partial<UserData>): Promise<UserData | undefined> => {
//   try {
//     await connect()
//     const query = { where: searchParams }
//     return (await UserModel.findOne(query))?.get({ plain: true })
//   } catch (error) {
//     logger.error({ fromMethod: 'getUserFixture', error }, 'Error')
//   }
// }
