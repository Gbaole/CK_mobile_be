import express from "express";
import categoryController from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get(
  "/:categoryId/products",
  categoryController.getProductsByCategory
);

export default categoryRouter;
