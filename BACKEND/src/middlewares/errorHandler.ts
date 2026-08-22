import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/errors'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Datos inválidos',
      details: err.flatten(),
    })
  }

  console.error(err)
  return res.status(500).json({ message: 'Error interno del servidor' })
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ message: 'Ruta no encontrada' })
}
