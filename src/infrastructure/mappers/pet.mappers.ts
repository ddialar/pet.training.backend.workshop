import { petRequests } from '@orm'
import { NewPetData } from '@types'

export const mapNewPetFromDomainToModel = (rawData: NewPetData): petRequests.NewPetWithOwnerDatabase => ({
  name: rawData.name,
  birthday: rawData.birthday
})

// export const mapUserFromModelToDomain = (rawData: petRequests.UserWithProfileDatabase): UserWithProfile => ({
//   id: rawData.id,
//   username: rawData.username,
//   password: rawData.password,
//   firstName: rawData.profile.firstName || '',
//   lastName: rawData.profile.lastName || '',
//   enabled: Boolean(rawData.enabled)
// })
