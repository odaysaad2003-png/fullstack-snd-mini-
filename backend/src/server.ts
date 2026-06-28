// import dns from "node:dns";
import type {Server} from "http";
import app from "./app";
import {connectDB, disconnectDB} from "./config/db";
import {env} from "./config/env";
import {logger} from "./utils/logger";

let isShuttingDown = false;

// function configureDns(): void {
//     dns.setServers(["1.1.1.1", "8.8.8.8"]);
//     dns.setDefaultResultOrder("ipv4first");

//     logger.info(`Node DNS servers: ${dns.getServers().join(", ")}`);
// }

function shutdown(server: Server, exitCode: number, reason: string): void {
    if (isShuttingDown) return;

    isShuttingDown = true;
    logger.warn(`Shutting down server: ${reason}`);

    server.close(() => {
        disconnectDB()
        .catch((error: unknown) => {
            logger.error("Error while closing MongoDB connection", error);
        })
        .finally(() => {
            process.exit(exitCode);
        });
    });
}

async function startServer(): Promise<void> {
    // configureDns();

    await connectDB();

    const server = app.listen(env.PORT, () => {
        logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });

    process.on("SIGTERM", () => {
        shutdown(server, 0, "SIGTERM received");
    });

    process.on("SIGINT", () => {
        shutdown(server, 0, "SIGINT received");
    });

    process.on("unhandledRejection", (reason: unknown) => {
        logger.error("Unhandled promise rejection", reason);
        shutdown(server, 1, "Unhandled promise rejection");
    });

    process.on("uncaughtException", (error: Error) => {
        logger.error("Uncaught exception", error);
        shutdown(server, 1, "Uncaught exception");
    });
}

startServer().catch((error: unknown) => {
    logger.error("Failed to start server", error);
    process.exit(1);
});
