import { UserData, UserProfileData, UserProfiledData } from '@types'

export const mapUserFromModelToDomain = (rawData: UserData & { UserProfileModel?: UserProfileData }): UserProfiledData => ({
  id: rawData.id,
  username: rawData.username,
  password: rawData.password,
  firstName: rawData.UserProfileModel?.firstName || '',
  lastName: rawData.UserProfileModel?.lastName || '',
  enabled: Boolean(rawData.enabled)
})
