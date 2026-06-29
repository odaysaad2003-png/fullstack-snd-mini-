import {Request, Response} from "express";
import {asyncHandler} from "../../utils/async-handler";
import {sendSuccess} from "../../utils/response.util";
import * as authService from "./auth.service";
import type {RegisterInput, LoginInput} from "./auth.validation";

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input = req.body as RegisterInput;

    const result = await authService.registerUser(input);

    sendSuccess(res, result, 201, "Account created successfully");
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const input = req.body as LoginInput;

    const result = await authService.loginUser(input);

    sendSuccess(res, result, 200, "Logged in successfully");
});

export const getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await authService.getMe(req.user!.id);

    sendSuccess(res, result, 200, "User fetched successfully");
});
