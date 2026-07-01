import bcrypt from "bcrypt";
import User from "./user.model";
import {AppError} from "../../utils/app-error";
import type {UpdateMyProfileInput, ChangeMyPasswordInput} from "./users.validation";

const SALT_ROUNDS = 12;

// ─── Get My Profile ───────────────────────────────────────────────────────────

export async function getMyProfile(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}

// ─── Update My Profile ────────────────────────────────────────────────────────

export async function updateMyProfile(userId: string, input: UpdateMyProfileInput) {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Explicit field assignment — never mass assignment
    if (input.name !== undefined) {
        user.name = input.name;
    }

    if (input.phone !== undefined) {
        user.phone = input.phone;
    }

    await user.save();

    return user;
}

// ─── Change My Password ───────────────────────────────────────────────────────

export async function changeMyPassword(userId: string, input: ChangeMyPasswordInput) {
    // Must use .select("+password") because password has select: false on the model
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // user.password is defined here because we selected it above.
    // The non-null assertion is safe in this context.
    const isMatch = await bcrypt.compare(input.currentPassword, user.password!);

    if (!isMatch) {
        throw new AppError("Current password is incorrect", 401);
    }

    // Hash and save
    user.password = await bcrypt.hash(input.newPassword, SALT_ROUNDS);
    await user.save();

    // Return nothing — the controller will send a success message with empty data
}
