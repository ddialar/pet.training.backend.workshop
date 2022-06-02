// import { UserData } from './user.types'

// ##############################################################
// #####                        PET                         #####
// ##############################################################

export interface BasicPetData {
  id: string
  name: string
  birthday: string
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export type NewPetRequest = Pick<BasicPetData, 'name' | 'birthday'> & {
  ownerEmail: string
}

export type NewPetData = Pick<BasicPetData, 'name' | 'birthday'> & {
  ownerId: string
}

export interface PetData extends BasicPetData {
  // owner: UserData
}
