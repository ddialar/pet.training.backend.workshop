import { connect, PetModel } from '@orm'
import { NewPetData, PetData } from '@types'

// export const cleanUsersDatabaseFixture = async (): Promise<void> => {
//   try {
//     await connect()
//     await UserModel.destroy({ truncate: true, cascade: true })
//   } catch (error) {
//     logger.error({ fromMethod: 'cleanUsersDatabaseFixture', error }, 'Error')
//   }
// }

export const createPetFixture = async ({ name, birthday, ownerId }: NewPetData): Promise<PetData> => {
  await connect()
  // return (await PetModel.create(
  //   parsedUserData,
  //   { include: [UserProfileModel] }
  // )).get({ plain: true }) as PetData
  return (await PetModel.create({ name, birthday })).get({ plain: true }) as PetData
}
