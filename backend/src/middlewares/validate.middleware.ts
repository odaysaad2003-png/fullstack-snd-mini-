import {Request, Response, NextFunction} from "express";
import {z} from "zod";
import {AppError} from "../utils/app-error";

export const validate = (schema: z.ZodTypeAny) => (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const firstIssue = result.error.issues[0];

            const message = firstIssue ? `${firstIssue.path.join(".")}: ${firstIssue.message}` : "Validation failed";

            return next(new AppError(message, 400));
        }

        req.body = result.data;
        next();
    };
