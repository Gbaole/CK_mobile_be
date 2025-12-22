import BaseController from "./base.controller.js";
import productService from "../services/product.service.js";
import categoryService from "../services/category.service.js";
import ResponseHandler from "../utils/response.handler.js";

class ProductController extends BaseController {
  constructor() {
    super(productService);
  }

  // sản phẩm bán chạy nhất
  getTopSelling = async (req, res) => {
    try {
      const data = await productService.getTopSelling(10);
      ResponseHandler.success(res, data, "Top selling products");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };

  // sản phẩm mới nhất <=7 ngày
  getNewProducts = async (req, res) => {
    try {
      const data = await productService.getNewProducts(10);
      ResponseHandler.success(res, data, "New products");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };

  // Lấy sản phẩm theo category
  getProductsByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const data = await categoryService.getProductsByCategory(categoryId);
      ResponseHandler.success(res, data, "Products by category");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
}

export default new ProductController();
