import { connect } from '../connection'
import { PetModel } from '../models'
import { PetData } from '@types'

export interface NewPetWithOwnerDatabase {
  name: string
  birthday: string
  // owner: {
  //   userId: string
  // }
}

export interface PetWithOwnerDatabase extends PetData {
  // TODO Define the owner data block.
}

export const createPet = async (petData: NewPetWithOwnerDatabase): Promise<PetData> => {
  await connect()
  return (await PetModel.create(
    petData
    // { include: [UserModel] }
  )).get({ plain: true }) as PetWithOwnerDatabase
}
