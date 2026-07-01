import {z} from "zod";

// ─── Update Profile Schema ────────────────────────────────────────────────────
//
// .strict() tells Zod to reject any key that is not explicitly defined here.
// This means if a client sends { role: "admin" } or { password: "hack" },
// Zod will return a validation error — the controller never runs.
//
// Both fields are optional individually, but the .refine() at the bottom
// enforces that at least one must be present. An empty body {} will fail.

export const updateMyProfileSchema = z
.object({
    name: z
    .string({invalid_type_error: "Name must be a string"})
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters")
    .optional(),

    phone: z.string({invalid_type_error: "Phone must be a string"}).trim().optional(),
})
.strict("Unknown or disallowed fields are not permitted")
.refine((data) => Object.keys(data).length > 0, {message: "At least one profile field must be provided"});

export type UpdateMyProfileInput = z.infer<typeof updateMyProfileSchema>;

// ─── Change Password Schema ───────────────────────────────────────────────────
//
// currentPassword and newPassword are both required.
// newPassword reuses the exact same policy as auth.validation.ts (min 8).
// .refine() rejects if the two passwords are identical — this check happens
// at the Zod layer, before bcrypt is ever called. Clean and cheap.

export const changeMyPasswordSchema = z
.object({
    currentPassword: z.string({required_error: "Current password is required"}).min(1, "Current password is required"),

    newPassword: z
    .string({required_error: "New password is required"})
    .min(8, "Password must be at least 8 characters"),
})
.strict("Unknown or disallowed fields are not permitted")
.refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from your current password",
    path: ["newPassword"],
});

export type ChangeMyPasswordInput = z.infer<typeof changeMyPasswordSchema>;
