import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
import { uploadCloud } from "../middlewares/image.middleware.js";
import { validateData } from "../middlewares/validate.middleware.js";
import {
  LoginInputSchema,
  UpdateProfileInputSchema,
} from "../validators/input/auth.input.validator.js";
const authRouter = express.Router();

authRouter.post("/register", AuthController.createNewAccount);
authRouter.post(
  "/login",
  validateData({ body: LoginInputSchema }),
  AuthController.login,
);
authRouter.patch(
  "/update-profile",
  authenticationMiddleware,
  validateData({ body: UpdateProfileInputSchema }),
  AuthController.updateProfile,
);

authRouter.patch(
  "/update-avatar",
  authenticationMiddleware,
  uploadCloud.single("avatar"),
  AuthController.updateAvatar,
);
export default authRouter;
