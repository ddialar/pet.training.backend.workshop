import { logger } from '@logger'
import { userRepositories, petRepositories } from '@repositories'
import { NewPetRequest, PetData } from '@types'

// TODO implement the createPet method
// export const createPet = async ({ name, birthday, ownerEmail }: NewPetRequest): Promise<PetData> => {
//   logger.info({ method: 'createPet controller', name, birthday }, 'New pet creation process started')

//   const ownerData = await userRepositories.findUserAndErrorIfNotExists({ username: ownerEmail })
//   const persistedPet = await petRepositories.createPet({ name, birthday, ownerId: ownerData.id })

//   logger.info({ method: 'createPet controller', name, birthday, ownerEmail }, 'New pet successfully created')

//   return persistedPet
// }
