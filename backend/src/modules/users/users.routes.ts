import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth.middleware";
import {validate} from "../../middlewares/validate.middleware";
import {updateMyProfileSchema, changeMyPasswordSchema} from "./users.validation";
import {getMyProfileHandler, updateMyProfileHandler, changeMyPasswordHandler} from "./users.controller";

const router = Router();

router.get("/me", authMiddleware, getMyProfileHandler);

router.patch("/me", authMiddleware, validate(updateMyProfileSchema), updateMyProfileHandler);

router.patch("/me/password", authMiddleware, validate(changeMyPasswordSchema), changeMyPasswordHandler);

export default router;
