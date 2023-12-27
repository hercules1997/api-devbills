import { Router } from 'express'

import { baseRoutes } from './base.routes'
import { categoriesRoutes } from './categories.route'
import { transactionsRoutes } from './transactions.route'
import cors from 'cors'

export const routes = Router()

routes.use(
  cors({
    origin: process.env.FRONT_URL
  })
)
routes.use('/', baseRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/transactions', transactionsRoutes)
