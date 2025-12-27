import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { LoginInputSchema } from "../validators/input/auth.input.validator.js";
import { validateData } from "../middlewares/validate.middleware.js";
const authRouter = express.Router();

authRouter.post("/register", AuthController.createNewAccount);
authRouter.post(
  "/login",
  validateData({ body: LoginInputSchema }),
  AuthController.login,
);
export default authRouter;
