import { Router } from 'express'
import { authRouter } from './authRoutes.ts'
import { productRouter } from './productRoutes.ts'
import { dealershipRouter } from './dealershipRoutes.ts'
import { contactRouter } from './contactRoutes.ts'
import { statsRouter } from './statsRoutes.ts'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/products', productRouter)
apiRouter.use('/dealership-applications', dealershipRouter)
apiRouter.use('/contact-messages', contactRouter)
apiRouter.use('/stats', statsRouter)
