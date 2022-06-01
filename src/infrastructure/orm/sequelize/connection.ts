import { Sequelize } from 'sequelize'
import { logger } from '@logger'
import { MYSQL_URL, MYSQL_LOG, MYSQL_POOL_SIZE } from '@config'

export const sequelize = new Sequelize(MYSQL_URL, {
  logging: MYSQL_LOG,
  pool: {
    max: MYSQL_POOL_SIZE,
    min: 0
  },
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/
    ],
    max: Infinity
  }
})

export const connect = async () => {
  try {
    await sequelize.authenticate()
    logger.debug('Sequelize connection success')
  } catch (error) {
    logger.error({ errorMessage: (<Error>error).message }, 'Sequelize connection fails')
  }
}
