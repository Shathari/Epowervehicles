import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { pinoHttp } from 'pino-http'
import { env } from './config/env.ts'
import { logger } from './utils/logger.ts'
import { apiRouter } from './routes/index.ts'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.ts'

export const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
app.use(pinoHttp({ logger }))

app.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } })
})

app.use('/api', apiRouter)

app.use(notFoundHandler)
app.use(errorHandler)
