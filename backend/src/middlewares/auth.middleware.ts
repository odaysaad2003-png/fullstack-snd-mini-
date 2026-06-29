import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from "../modules/users/user.model";
import {env} from "../config/env";
import {AppError} from "../utils/app-error";
import {asyncHandler} from "../utils/async-handler";
import type {AuthTokenPayload} from "../modules/auth/auth.types";

export const authMiddleware = asyncHandler(async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authentication required", 401);
    }

    const token = authHeader.slice(7);

    let payload: AuthTokenPayload;

    try {
        payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthTokenPayload;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new AppError("Token has expired", 401);
        }

        throw new AppError("Invalid token", 401);
    }

    const user = await User.findById(payload.sub);

    if (!user) {
        throw new AppError("User no longer exists", 401);
    }

    if (user.status === "suspended") {
        throw new AppError("Your account has been suspended", 403);
    }

    req.user = {
        id: user._id.toString(),
        role: user.role,
        status: user.status,
    };

    next();
});
