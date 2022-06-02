import { userRequests } from '@orm'
import { NewUserData, UserWithProfile } from '@types'

export const mapNewUserFromDomainToModel = (rawData: NewUserData): userRequests.NewUserWithProfileDatabase => ({
  username: rawData.email,
  password: rawData.password,
  profile: {
    firstName: rawData.firstName,
    lastName: rawData.lastName,
    email: rawData.email
  }
})

export const mapUserFromModelToDomain = (rawData: userRequests.UserWithProfileDatabase): UserWithProfile => ({
  id: rawData.id,
  username: rawData.username,
  password: rawData.password,
  firstName: rawData.profile.firstName || '',
  lastName: rawData.profile.lastName || '',
  enabled: Boolean(rawData.enabled)
})
