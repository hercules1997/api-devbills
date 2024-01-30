import 'dotenv/config'

import express, { json } from 'express'
import { routes } from './routes'
import { setupMongo } from './database'
import { errorHandle } from './middlewares/error-handle.middleware'
import cors from 'cors'
setupMongo().then(() => {
  const app = express()

  app.use(cors())
  app.use(json())
  app.use(routes)
  app.use(errorHandle)
  const port = 3333

  app.listen(port, () => console.log(`🚀 App is running at port ${port}`))
})
