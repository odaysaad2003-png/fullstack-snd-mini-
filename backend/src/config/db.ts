import mongoose from "mongoose";
import {env} from "./env";
import {logger} from "../utils/logger";

let listenersRegistered = false;

function registerConnectionListeners(): void {
    if (listenersRegistered) return;

    mongoose.connection.on("connected", () => {
        logger.info("MongoDB connected");
    });

    mongoose.connection.on("disconnected", () => {
        logger.warn("MongoDB disconnected");
    });

    mongoose.connection.on("error", (error: Error) => {
        logger.error("MongoDB connection error", error);
    });

    listenersRegistered = true;
}

export async function connectDB(): Promise<void> {
    registerConnectionListeners();

    await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    });
}

export async function disconnectDB(): Promise<void> {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed");
}
