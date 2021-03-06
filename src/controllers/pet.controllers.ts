import { logger } from '@logger'
import { userRepositories, petRepositories } from '@repositories'
import { NewPetRequest, PetData } from '@types'

export const createPet = async ({ name, birthday, ownerEmail }: NewPetRequest): Promise<PetData> => {
  logger.info({ method: 'createPet controller', name, birthday }, 'New pet creation process started')

  const ownerData = await userRepositories.findUserAndErrorIfNotExists({ username: ownerEmail })
  const persistedPet = await petRepositories.createPet({ name, birthday, ownerId: ownerData.id })

  logger.info({ method: 'createPet controller', name, birthday, ownerEmail }, 'New pet successfully created')

  return persistedPet
}

export const getPetById = async (id: string): Promise<PetData> => {
  logger.info({ method: 'getPetById controller' }, 'Retrieving registered pet')
  return await petRepositories.findPetAndErrorIfNotExists({ id })
}

export const getAllPets = async (): Promise<PetData[]> => {
  logger.info({ method: 'getAllPets controller' }, 'Retrieving registered pets')
  return await petRepositories.getAllPets()
}
