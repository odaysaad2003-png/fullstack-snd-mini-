import type {Response} from "express";

interface SuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
}

interface ErrorResponse {
    success: false;
    error: {
        message: string;
        code?: string;
    };
}

export function sendSuccess<T>(res: Response, data: T, statusCode: number = 200, message?: string): void {
    const body: SuccessResponse<T> = {success: true, data};

    if (message !== undefined) {
        body.message = message;
    }

    res.status(statusCode).json(body);
}

export function sendError(res: Response, message: string, statusCode: number = 500, code?: string): void {
    const body: ErrorResponse = {
        success: false,
        error: {message},
    };

    if (code !== undefined) {
        body.error.code = code;
    }

    res.status(statusCode).json(body);
}
