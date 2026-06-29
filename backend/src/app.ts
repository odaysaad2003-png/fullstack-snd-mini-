import cors from "cors";
import express from "express";
import helmet from "helmet";

import {env} from "./config/env";
import {errorMiddleware} from "./middlewares/error.middleware";
import {globalRateLimiter} from "./middlewares/rate-limit.middleware";

import healthRouter from "./routes/health.routes";
import routersystem from "./routes/system.routes";
import authRouter from "./modules/auth/auth.routes";

import {sendError} from "./utils/response.util";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: env.CLIENT_ORIGIN,
        credentials: true,
    })
);

app.use(globalRateLimiter);

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));

app.use("/api/v1/health", healthRouter);

// test api
app.use("/api/v1/system/status", routersystem);

// auth api
app.use("/api/v1/auth", authRouter);

app.use((_req, res) => {
    sendError(res, "Route not found", 404, "ROUTE_NOT_FOUND");
});

app.use(errorMiddleware);

export default app;
