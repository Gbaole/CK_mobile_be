import express from "express";
import productRouter from "../routes/product.routes.js";
import categoryRouter from "../routes/category.routes.js";
import authRouter from "./auth.routes.js";
import cartRouter from "./cart.routes.js";
import orderRouter from "./order.routes.js";
const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/order", orderRouter);

export default mainRouter;
