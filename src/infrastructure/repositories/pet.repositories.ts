import { logger } from '@logger'
import { petRequests } from '@orm'
import { CreatePetError } from '@errors'
import { NewPetData, PetData } from '@types'

// TODO Implement the createPet method
// export const createPet = async (newPet: NewPetData): Promise<PetData> => {
//   try {
//     return await petRequests.createPet(newPet)
//   } catch (error) {
//     logger.error({ method: 'repository createPet', newPet }, 'Pet creation error')
//     throw new CreatePetError((<Error>error).message)
//   }
// }
