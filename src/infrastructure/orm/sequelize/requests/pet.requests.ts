import { connect } from '../connection'
import { PetModel } from '../models'
import { NewPetData, PetData } from '@types'

// TODO Implement the createPet method
// REFACTOR: Edit this method signature once the relationship with the pet owner is available
// export const createPet = async ({ name, birthday }: NewPetData): Promise<PetData> => {
//   await connect()
//   return (await PetModel.create(
//     { name, birthday }
//     // { include: [UserModel] }
//   )).get({ plain: true }) as PetData
// }
