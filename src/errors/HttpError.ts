import * as http from 'http';

export default class HttpError extends Error {
    status: number;

    constructor(status?: number, message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);

        this.status = status || 500;
        this.name = 'HttpError';
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}
