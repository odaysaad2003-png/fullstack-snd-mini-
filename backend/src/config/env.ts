import {z} from "zod";
import "dotenv/config";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive()),

    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

    CLIENT_ORIGIN: z.string().min(1, "CLIENT_ORIGIN is required"),

    JWT_ACCESS_SECRET: z.string().min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:\n");

    parsed.error.issues.forEach((issue) => {
        console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    });

    process.exit(1);
}

export const env = parsed.data;
