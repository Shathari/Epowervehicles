import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { pinoHttp } from 'pino-http'
import { env } from './config/env.ts'
import { logger } from './utils/logger.ts'
import { apiRouter } from './routes/index.ts'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.ts'
import { UPLOADS_DIR } from './middleware/upload.ts'

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

// Uploaded product images are meant to be embedded from the frontend's own origin — override
// helmet's default same-origin Cross-Origin-Resource-Policy just for this path.
app.use(
  '/uploads',
  (_req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    next()
  },
  express.static(UPLOADS_DIR),
)

app.use('/api', apiRouter)

app.use(notFoundHandler)
app.use(errorHandler)
