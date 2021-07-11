import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: HttpException, req: Request, res: Response, _next: NextFunction) => {
    if (req.url.includes('/favicon.ico')) {
        return;
    }
    if (err) {
        logger.error(JSON.stringify(err));
        res.status(500).json({ error: err });
    }
};

export default errorHandler;

class HttpException extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    error: string | null;

    constructor(statusCode: number, message: string, error?: string) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
