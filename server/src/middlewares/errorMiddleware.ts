import { Request, ResponseToolkit } from '@hapi/hapi';
import logger from '../utils/logger';

/**
 * Global error handler middleware
 */
export const errorHandler = async (request: Request, h: ResponseToolkit, err?: Error) => {
  if (err) {
    // Log the error
    logger.error(`Unhandled error: ${err.message}`, {
      stack: err.stack,
      path: request.path,
      method: request.method,
    });

    // Return a generic error response
    return h.response({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    }).code(500);
  }

  return h.continue;
};

/**
 * Not found handler middleware
 */
export const notFoundHandler = (request: Request, h: ResponseToolkit) => {
  return h.response({
    statusCode: 404,
    error: 'Not Found',
    message: 'The requested resource was not found',
  }).code(404);
};

/**
 * Validation error handler middleware
 */
export const validationErrorHandler = (request: Request, h: ResponseToolkit, err: Error) => {
  if (err.name === 'ValidationError') {
    return h.response({
      statusCode: 400,
      error: 'Bad Request',
      message: err.message,
    }).code(400);
  }

  return h.continue;
};