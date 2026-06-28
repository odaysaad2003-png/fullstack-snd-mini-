import rateLimit from "express-rate-limit";
import {sendError} from "../utils/response.util";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler(_req, res) {
        sendError(res, "Too many requests, please try again later.", 429, "RATE_LIMIT_EXCEEDED");
    },
});
