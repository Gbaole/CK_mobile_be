import express from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";
import { validateData } from "../middlewares/validate.middleware.js";
import CartController from "../controllers/cart.controller.js";
import {
  addProductToCartSchema,
  removeProductFormCartSchema,
} from "../validators/input/cart.input.validator.js";
const cartRouter = express.Router();

cartRouter.get("/", authenticationMiddleware, CartController.myCart);

cartRouter.post(
  "/",
  authenticationMiddleware,
  validateData({ body: addProductToCartSchema }),
  CartController.addProductToCart
);
cartRouter.patch(
  "/update-quantity",
  authenticationMiddleware,
  CartController.updateCartItemQuantity
);

cartRouter.delete(
  "/:productId",
  authenticationMiddleware,
  validateData({ params: removeProductFormCartSchema }),
  CartController.removeProductFormCart
);

export default cartRouter;
