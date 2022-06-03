import { connect } from '../connection'
import { PetModel } from '../models'
import { NewPetData, PetData } from '@types'

// REFACTOR: Edit this method signature once the relationship with the pet owner is available
export const createPet = async ({ name, birthday }: NewPetData): Promise<PetData> => {
  await connect()
  return (await PetModel.create(
    { name, birthday }
    // { include: [UserModel] }
  )).get({ plain: true }) as PetData
}

export const getPet = async (searchParams: Partial<PetData>): Promise<PetData | undefined> => {
  await connect()
  const query = {
    where: searchParams
    // include: [UserModel]
  }
  return (await PetModel.findOne(query))?.get({ plain: true }) as PetData
}

export const getAllPets = async (): Promise<PetData[]> => {
  await connect()
  return <PetData[]>(await PetModel.findAll({
    // include: [UserProfileModel]
  })).map(pet => pet.get({ plain: true })) || []
}
