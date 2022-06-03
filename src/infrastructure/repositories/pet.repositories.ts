import { logger } from '@logger'
import { petRequests } from '@orm'
import { CreatePetError, PetNotFoundError, RetrievePetError } from '@errors'
import { NewPetData, PetData } from '@types'

export const createPet = async (newPet: NewPetData): Promise<PetData> => {
  try {
    return await petRequests.createPet(newPet)
  } catch (error) {
    logger.error({ method: 'repository createPet', newPet }, 'Pet creation error')
    throw new CreatePetError((<Error>error).message)
  }
}

// TODO Implement the getPet method
// export const getPet = async (searchParms: Partial<PetData>): Promise<PetData | undefined> => {
//   try {
//     return await petRequests.getPet(searchParms)
//   } catch (error) {
//     logger.error({ method: 'repository getPet' }, 'Retrieving pet error')
//     throw new RetrievePetError((<Error>error).message)
//   }
// }

export const getAllPets = async (): Promise<PetData[]> => {
  try {
    return await petRequests.getAllPets()
  } catch (error) {
    logger.error({ method: 'repository getAllPets' }, 'Retrieving all pets error')
    throw new RetrievePetError((<Error>error).message)
  }
}

// TODO implement the findPetAndErrorIfNotExists method
// export const findPetAndErrorIfNotExists = async (query: Partial<PetData>): Promise<PetData> => {
//   const pet = await getPet(query)
//   if (!pet) {
//     logger.error({ method: 'repository findPetAndErrorIfNotExists', query }, 'Pet not found')
//     throw new PetNotFoundError()
//   }

//   return pet
// }
