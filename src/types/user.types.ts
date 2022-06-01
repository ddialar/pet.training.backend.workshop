// ##############################################################
// #####                        USER                        #####
// ##############################################################

export interface SigninRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface NewUserData {
  username: string
  password: string
}

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

export interface UserProfileData {
  firstName: string
  lastName: string
  email: string
  userId: string
}

// ##############################################################
// #####                    USER - PET                      #####
// ##############################################################

export interface UserPetData {
  id: string
  userId: string
  petId: string
}
