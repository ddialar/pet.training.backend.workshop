import { NewUserData, NewUserWithProfile } from '@types'

export const mapNewUserFromDomainToModel = (rawData: NewUserData): NewUserWithProfile => ({
  username: rawData.email,
  password: rawData.password,
  profile: {
    firstName: rawData.firstName,
    lastName: rawData.lastName,
    email: rawData.email
  }
})
