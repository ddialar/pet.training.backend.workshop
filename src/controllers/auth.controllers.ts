import { checkPassword, encodeJwt } from '@services'
import { LoginRequest, LoginResponse } from '@types'
import { userRepositories } from '@repositories'

export const login = async ({ username, password }: LoginRequest): Promise<LoginResponse> => {
  const { id: userId, password: hashedPassword } = await userRepositories.findUserAndErrorIfNotExists({ username })
  await checkPassword(password, hashedPassword)
  const token = encodeJwt(userId, username)
  return { token }
}
