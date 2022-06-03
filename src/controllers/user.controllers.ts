import { logger } from '@logger'
import { hashPassword } from '@services'
import { userRepositories } from '@repositories'
import { SigninRequest } from '@types'

// TODO implement the signin method
// export const signin = async ({ email, password, firstName, lastName }: SigninRequest): Promise<void> => {
//   logger.info({ method: 'signin controller', email, firstName, lastName }, 'New user signin process started')

//   await userRepositories.findUserAndErrorIfExists({ username: email })
//   const hashedPassword = await hashPassword(password)
//   await userRepositories.createUser({ email, password: hashedPassword, firstName, lastName })

//   logger.info({ method: 'signin controller', email }, 'New user and profile successfully created')
// }
