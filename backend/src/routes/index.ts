import { Router } from 'express'
import { authRouter } from './authRoutes.ts'
import { productRouter } from './productRoutes.ts'
import { dealershipRouter } from './dealershipRoutes.ts'
import { contactRouter } from './contactRoutes.ts'
import { statsRouter } from './statsRoutes.ts'
import { salesPartnerRouter } from './salesPartnerRoutes.ts'
import { userRouter } from './userRoutes.ts'
import { aboutRouter } from './aboutRoutes.ts'
import { publicAdminUploadRouter } from './uploadRoutes.ts'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/public/admin', publicAdminUploadRouter)
apiRouter.use('/products', productRouter)
apiRouter.use('/dealership-applications', dealershipRouter)
apiRouter.use('/contact-messages', contactRouter)
apiRouter.use('/stats', statsRouter)
apiRouter.use('/sales-partner-applications', salesPartnerRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/about', aboutRouter)
