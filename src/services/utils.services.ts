import { randomUUID, createHash } from 'crypto'

export const createUUID = () => randomUUID()

export const hashPassword = async (password: string): Promise<string> => createHash('sha512').update(password).digest('hex')
