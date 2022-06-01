export const requiredEnvVariables = [
  'NODE_ENV',
  'SERVICE_NAME',
  'LOG_LEVEL',
  'SERVER_PORT',
  'MYSQL_URL',
  'MYSQL_LOG',
  'MYSQL_POOL_SIZE',
  'BCRYPT_SALT',
  'JWT_KEY',
  'JWT_ALGORITHM',
  'JWT_EXPIRING_TIME_IN_SECONDS'
]

export const NODE_ENV = process.env.NODE_ENV || 'production'
export const SERVICE_NAME = process.env.SERVICE_NAME || 'unknown'
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info' // Valid values 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'
export const SERVER_PORT = parseInt(process.env.SERVER_PORT || '3003', 10)

export const MYSQL_URL = process.env.MYSQL_URL || ''
export const MYSQL_LOG = Boolean(process.env.MYSQL_LOG)
export const MYSQL_POOL_SIZE = parseInt(process.env.MYSQL_POOL_SIZE || '5', 10)

export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || '10', 10)

export const JWT_KEY = process.env.JWT_KEY || ''
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS512'
export const JWT_EXPIRING_TIME_IN_SECONDS = parseInt(process.env.JWT_EXPIRING_TIME_IN_SECONDS || '60', 10)
