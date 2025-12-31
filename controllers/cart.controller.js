import BaseController from "./base.controller.js";
import ResponseHandler from "../utils/response.handler.js";
import CartService from "../services/cart.service.js";

class CartController extends BaseController {
  constructor() {
    super(CartService);
  }

  myCart = async (req, res) => {
    try {
      const data = await CartService.findCartByUserId(req.user.id);
      ResponseHandler.success(res, data, "Cart is success");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
      const data = await CartService.addProductToCart(
        userId,
        productId,
        quantity
      );
      ResponseHandler.success(res, data, "Add to cart is success");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
  removeProductFormCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;
      const data = await CartService.removeProductFormCart(userId, productId);
      ResponseHandler.success(res, data, "delete product form cart is success");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
  updateCartItemQuantity = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      if (!productId || quantity === undefined) {
        return ResponseHandler.error(res, "Thiếu productId hoặc số lượng");
      }

      const data = await CartService.updateCartItemQuantity(
        userId,
        productId,
        quantity
      );

      ResponseHandler.success(res, data, "Cập nhật số lượng thành công");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
}

export default new CartController();
