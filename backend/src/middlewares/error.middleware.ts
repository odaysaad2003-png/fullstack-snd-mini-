import type {NextFunction, Request, Response} from "express";
import {env} from "../config/env";
import {AppError} from "../utils/app-error";
import {logger} from "../utils/logger";
import {sendError} from "../utils/response.util";

export function errorMiddleware(err: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) {
        next(err);
        return;
    }

    if (err instanceof AppError) {
        if (err.statusCode >= 500) {
            logger.error(err.message, err);
        }

        sendError(res, err.message, err.statusCode, err.code);
        return;
    }

    logger.error("Unexpected error", err);

    const message =
        env.NODE_ENV === "development" && err instanceof Error ? err.message : "An unexpected error occurred";

    sendError(res, message, 500, "INTERNAL_SERVER_ERROR");
}
