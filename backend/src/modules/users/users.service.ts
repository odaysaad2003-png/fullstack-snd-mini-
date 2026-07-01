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
    
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.password) {
        throw new AppError("Password is not available for this user", 500);
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(input.currentPassword, user.password);

    if (!isCurrentPasswordCorrect) {
        throw new AppError("Current password is incorrect", 401);
    }

    const isSamePassword = await bcrypt.compare(input.newPassword, user.password);

    if (isSamePassword) {
        throw new AppError("New password must be different from current password", 400);
    }

    user.password = await bcrypt.hash(input.newPassword, SALT_ROUNDS);

    await user.save();
}