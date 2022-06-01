import { sequelize } from '@orm'
import { logger } from '@logger'

export const cleanDatabaseFixture = async () => {
  try {
    await sequelize.sync({ force: true })
  } catch (error) {
    logger.error({ fromMethod: 'cleanDatabaseFixture', error }, 'Error')
  }
}
