import express from "express";
import productRouter from "../routes/product.routes.js";
import categoryRouter from "../routes/category.routes.js";

const mainRouter = express.Router();

mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);

export default mainRouter;
