import { app } from './app.ts'
import { env } from './config/env.ts'
import { logger } from './utils/logger.ts'

app.listen(env.PORT, () => {
  logger.info(`EPOWER Vehicles API listening on http://localhost:${env.PORT}`)
})
