import {env} from "../config/env";

type LogLevel = "info" | "warn" | "error" | "debug";

const colors: Record<LogLevel, string> = {
    info: "\x1b[36m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    debug: "\x1b[90m",
};

const reset = "\x1b[0m";

function normalizeMeta(meta: unknown): unknown {
    if (meta === undefined) return undefined;

    if (meta instanceof Error) {
        return {
            name: meta.name,
            message: meta.message,
            stack: env.NODE_ENV === "production" ? undefined : meta.stack,
        };
    }

    return meta;
}

function safeJson(value: unknown): string {
    try {
        return JSON.stringify(value);
    } catch {
        return '"[unserializable]"';
    }
}

function formatMessage(level: LogLevel, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    const normalizedMeta = normalizeMeta(meta);

    if (env.NODE_ENV === "production") {
        return safeJson({
            timestamp,
            level,
            message,
            meta: normalizedMeta,
        });
    }

    const upper = level.toUpperCase().padEnd(5);
    const metaSuffix = normalizedMeta !== undefined ? ` ${safeJson(normalizedMeta)}` : "";

    return `${colors[level]}[${timestamp}] ${upper}${reset} ${message}${metaSuffix}`;
}

export const logger = {
    info(message: string, meta?: unknown): void {
        console.log(formatMessage("info", message, meta));
    },

    warn(message: string, meta?: unknown): void {
        console.warn(formatMessage("warn", message, meta));
    },

    error(message: string, meta?: unknown): void {
        console.error(formatMessage("error", message, meta));
    },

    debug(message: string, meta?: unknown): void {
        if (env.NODE_ENV !== "production") {
            console.log(formatMessage("debug", message, meta));
        }
    },
};
