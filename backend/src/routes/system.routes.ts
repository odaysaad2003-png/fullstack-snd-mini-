import {Router} from "express";
import mongoose from "mongoose";
import {asyncHandler} from "../utils/async-handler";
import {sendError, sendSuccess} from "../utils/response.util";


const routersystem = Router();


routersystem.get(
    "/",
    asyncHandler(async (_req, res) => {
        const isDatabaseConnected = mongoose.connection.readyState === 1;

        if (!isDatabaseConnected) {
            sendError(res, "Database unavailable", 503, "DATABASE_UNAVAILABLE");
            return;
        }

        sendSuccess(res, {
            success: true,
            data: {
                service: "snd-mini-api-oday",
                environment: "development",
                database: {
                    state: 1,
                    status: "connected",
                },
                uptime: 123.45,
                timestamp: "...",
            },
        });
    })
);

export default routersystem;