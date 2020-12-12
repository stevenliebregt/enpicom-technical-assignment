import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/HttpError';
import httpStatus from 'http-status';

/**
 * Converts error to HttpError and handles it
 */
export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    let convertedError: HttpError;

    if (error instanceof HttpError) {
        convertedError = error;
    } else{
        convertedError = new HttpError(500, error.message);
    }

    const result = {
        code: convertedError.status,
        message: convertedError.message || httpStatus[convertedError.status],
        stack: convertedError.stack,
    };

    // Delete stack if prod dev or not
    // delete result.stack;

    response.status(result.code);
    response.json(result);
}

/**
 * Handles page not found
 */
export function notFound(request: Request, response: Response, next: NextFunction) {
    const error = new HttpError(404, httpStatus[404]);
    return errorHandler(error, request, response, next);
}
