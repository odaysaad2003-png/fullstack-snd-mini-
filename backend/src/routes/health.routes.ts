import {Router} from "express";
import mongoose from "mongoose";
import {asyncHandler} from "../utils/async-handler";
import {sendError, sendSuccess} from "../utils/response.util";

const router = Router();

router.get(
    "/",
    asyncHandler(async (_req, res) => {
        const isDatabaseConnected = mongoose.connection.readyState === 1;

        if (!isDatabaseConnected) {
            sendError(res, "Database unavailable", 503, "DATABASE_UNAVAILABLE");
            return;
        }

        sendSuccess(res, {
            status: "ok",
            service: "snd-mini-api",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    })
);

export default router;
