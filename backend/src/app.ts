import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware'

const app = express()

app.use(cors({ origin: env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'ShopBD API is running 🚀' })
})

// import routes from './routes'
// app.use('/api', routes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app
