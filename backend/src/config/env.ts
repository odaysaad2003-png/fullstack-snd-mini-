import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    PORT: z.coerce
    .number()
    .int("PORT must be an integer")
    .min(1, "PORT must be at least 1")
    .max(65535, "PORT must be at most 65535")
    .default(5000),

    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

    CLIENT_ORIGIN: z.string().url("CLIENT_ORIGIN must be a valid URL"),

    JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

    JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),

    JWT_ACCESS_EXPIRES_IN: z.string().min(1),
    
    JWT_REFRESH_EXPIRES_IN: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:\n");

    parsed.error.issues.forEach((issue) => {
        console.error(`  ${issue.path.join(".")} — ${issue.message}`);
    });

    process.exit(1);
}

export const env = parsed.data;

