import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { corsOrigins } from './config/env'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'
import { apiRouter } from './routes'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || corsOrigins.includes(origin)) {
          callback(null, true)
          return
        }
        callback(new Error(`CORS blocked for origin: ${origin}`))
      },
      credentials: true,
    }),
  )
  app.use(morgan('dev'))
  app.use(express.json({ limit: '2mb' }))
  app.use(express.urlencoded({ extended: true }))

  app.get('/', (_req, res) => {
    res.json({
      name: 'ImportCAS API',
      docs: '/api/health',
      payments: ['mercado_pago', 'addi', 'bold'],
    })
  })

  app.use('/api', apiRouter)
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
