// ##############################################################
// #####                        USER                        #####
// ##############################################################

export interface SigninRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface NewUserData extends SigninRequest {}

export interface UserData {
  id: string
  username: string
  password: string
  enabled: boolean
  createdAt: Date
  updatedAt: Date
}

// ##############################################################
// #####                      PROFILE                       #####
// ##############################################################

export interface ProfileData {
  firstName: string
  lastName: string
  email: string
  userId: string
}

export type NewUserWithProfile =
  Pick<UserData, 'username' | 'password'> &
  { profile: Omit<ProfileData, 'userId'> }

export type UserWithProfile = UserData & { profile: ProfileData }

// ##############################################################
// #####                    USER - PET                      #####
// ##############################################################

export interface UserPetData {
  id: string
  userId: string
  petId: string
}
