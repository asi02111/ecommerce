import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { env } from '../config/env'

export const errorMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500
  let message = 'Internal Server Error'

  if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
  } else if (err.name === 'ValidationError') {
    statusCode = 400
    message = err.message
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  }

  if (env.NODE_ENV === 'development') {
    console.error('🔥 Error:', err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}
