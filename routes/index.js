import express from "express";
import productRouter from "../routes/product.routes.js";
import categoryRouter from "../routes/category.routes.js";
import authRouter from "./auth.routes.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);

mainRouter.use(authenticationMiddleware);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);

export default mainRouter;
