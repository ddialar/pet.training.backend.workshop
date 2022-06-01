import { logger } from '@logger'
import { hash, compare } from 'bcrypt'
import { sign, verify, Secret, SignOptions, Algorithm } from 'jsonwebtoken'
import { CheckingPasswordError, CheckingTokenError, TokenExpiredError, TokenGenerationError } from '@errors'
import { BCRYPT_SALT, JWT_KEY, JWT_ALGORITHM, JWT_EXPIRING_TIME_IN_SECONDS } from '@config'
import { DecodedJwtToken, JwtPayload } from '@types'

export const hashPassword = async (password: string): Promise<string> => hash(password, BCRYPT_SALT)

export const checkPassword = async (plainPassword: string, hashedPassword: string): Promise<void> => {
  try {
    const passwordValid = await compare(plainPassword, hashedPassword)

    if (!passwordValid) {
      throw new Error('Password mismatch')
    }
  } catch (error) {
    logger.error({ method: 'service checkPassword', error })
    throw new CheckingPasswordError()
  }
}

export const encodeJwt = (userId: string, username: string): string => {
  const payload: JwtPayload = {
    sub: userId,
    username
  }
  const secret: Secret = JWT_KEY
  const options: SignOptions = {
    algorithm: JWT_ALGORITHM as Algorithm,
    expiresIn: JWT_EXPIRING_TIME_IN_SECONDS
  }

  try {
    return sign(payload, secret, options)
  } catch (error) {
    logger.error({ method: 'service encodeJwt', userId, username, error })
    throw new TokenGenerationError()
  }
}

export const checkToken = (token: string): DecodedJwtToken => {
  try {
    const secret: Secret = process.env.JWT_KEY!
    return verify(token, secret) as DecodedJwtToken
  } catch (error) {
    throw (<Error>error).message.match(/expired/)
      ? new TokenExpiredError(`Token '${token}' expired`)
      : new CheckingTokenError(`Error ckecking token '${token}'. ${(<Error>error).message}`)
  }
}
