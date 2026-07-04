import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError, ZodIssue } from 'zod';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Existem campos inválidos na requisição.',
      // Trocamos 'errors' por 'issues' e tipamos o 'e' explicitamente como ZodIssue
      details: err.issues.map((e: ZodIssue) => ({ 
        field: e.path.join('.'), 
        message: e.message 
      }))
    });
  }

  console.error('❌ Erro Crítico Interno:', err);
  
  return res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Ocorreu um erro interno ao processar a solicitação.'
  });
};