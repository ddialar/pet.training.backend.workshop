// import { join } from 'path'
import { createServer } from 'http'
import express from 'express'
import helmet from 'helmet'
// import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express'
// import YAML from 'yamljs'
import { router } from '@routers'
import { handleHttpError } from '@middlewares'
// import { logger } from '@logger'
// import { NODE_ENV, SERVER_PORT } from '@config'

const app = express()

app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// if (NODE_ENV === 'development') {
//   app.use('/__/apidoc', swaggerServe, swaggerSetup(YAML.load(join(__dirname, '../api.yaml'))))
// }

// TODO Include routes here
app.use(router)

// TODO Include error middleware here
app.use(handleHttpError)

export const server = createServer(app)

// export const runServer = () => server.listen(SERVER_PORT, () => logger.info(`Server running in http://localhost:${SERVER_PORT}`))

// export const stopServer = () => {
//   logger.info('Closing sever...')
//   server.close()
// }
