import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

// Type narrowed version of the error
interface MongooseError extends Error {
  path?: string;
  value?: string;
  errors?: Record<string, { message: string }>;
  code?: number;
  keyValue?: Record<string, any>;
  isOperational?: boolean;
  statusCode?: number;
  status?: string;
}


const handleCastErrorDB = (err: MongooseError): AppError => {
  const message = `Invalid: ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldErrorDB = (err: MongooseError): AppError => {
  const field = err.keyValue ? Object.keys(err.keyValue)[0] : '';
  const value = err.keyValue ? err.keyValue[field] : '';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: MongooseError): AppError => {
  const errors = Object.values(err.errors || {}).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError('Invalid token! Please login again.', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please login again.', 401);

const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    // 1. Log error
    console.error('Error 💥:', err);
    // 2. Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const globalErrorHandler = (
  err: MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err as AppError, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error as AppError, res);
  }
};

export default globalErrorHandler;
