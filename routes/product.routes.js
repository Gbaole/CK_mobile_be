import express from "express";
import productController from "../controllers/product.controller.js";
import {
  authenticationMiddleware,
  authorize,
} from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  authenticationMiddleware,
  authorize("admin"),
  productController.create,
);
productRouter.get("/", productController.getAllProducts);

productRouter.get("/top-selling", productController.getTopSelling);
productRouter.get("/new-products", productController.getNewProducts);
// productRouter.get(
//   "/category/:categoryId",
//   productController.getProductsByCategory,
// );

productRouter.get("/:id", productController.getProductDetail);
productRouter.put("/:id", productController.updateById);
productRouter.delete("/:id", productController.deleteById);

export default productRouter;
