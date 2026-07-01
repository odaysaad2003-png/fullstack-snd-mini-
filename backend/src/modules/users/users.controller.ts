import type {Request, Response} from "express";
import {asyncHandler} from "../../utils/async-handler";
import {sendSuccess} from "../../utils/response.util";
import {AppError} from "../../utils/app-error";
import {getMyProfile, updateMyProfile, changeMyPassword} from "./users.service";
import type {UpdateMyProfileInput, ChangeMyPasswordInput} from "./users.validation";

// ─── GET /api/v1/users/me ─────────────────────────────────────────────────────

export const getMyProfileHandler = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Authentication required", 401);
    }

    const user = await getMyProfile(req.user.id);

    sendSuccess(res, {user}, 200, "User profile fetched successfully");
});

// ─── PATCH /api/v1/users/me ───────────────────────────────────────────────────

export const updateMyProfileHandler = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Authentication required", 401);
    }

    const input = req.body as UpdateMyProfileInput;

    const user = await updateMyProfile(req.user.id, input);

    sendSuccess(res, {user}, 200, "Profile updated successfully");
});

// ─── PATCH /api/v1/users/me/password ─────────────────────────────────────────

export const changeMyPasswordHandler = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Authentication required", 401);
    }

    const input = req.body as ChangeMyPasswordInput;

    await changeMyPassword(req.user.id, input);

    sendSuccess(res, {}, 200, "Password changed successfully");
});
