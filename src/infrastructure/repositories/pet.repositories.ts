import { logger } from '@logger'
import { petRequests } from '@orm'
import { mapNewPetFromDomainToModel } from '@mappers'
import { CreatePetError, RetrievePetError } from '@errors'
import { NewPetData, PetData } from '@types'

export const createPet = async (newPet: NewPetData): Promise<PetData> => {
  try {
    return await petRequests.createPet(mapNewPetFromDomainToModel(newPet))
  } catch (error) {
    logger.error({ method: 'repository createPet', newPet }, 'Pet creation error')
    throw new CreatePetError((<Error>error).message)
  }
}

export const getAllPets = async (): Promise<PetData[]> => {
  try {
    return await petRequests.getAllPets()
  } catch (error) {
    logger.error({ method: 'repository getAllPets' }, 'Retrieving all pets error')
    throw new RetrievePetError((<Error>error).message)
  }
}
