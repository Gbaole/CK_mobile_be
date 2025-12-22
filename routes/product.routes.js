import express from "express";
import productController from "../controllers/product.controller.js";

const productRouter = express.Router();

// CRUD cơ bản
productRouter.post("/", productController.create);
productRouter.get("/", productController.getAll);

productRouter.get("/top-selling", productController.getTopSelling);
productRouter.get("/new-products", productController.getNewProducts);
productRouter.get(
  "/category/:categoryId",
  productController.getProductsByCategory
);

productRouter.get("/:id", productController.getById);
productRouter.put("/:id", productController.updateById);
productRouter.delete("/:id", productController.deleteById);

export default productRouter;
