import BaseController from "./base.controller.js";
import CategoryService from "../services/category.service.js";
import ResponseHandler from "../utils/response.handler.js";

class CategoryController extends BaseController {
  constructor() {
    super(CategoryService);
  }

  // Hiển thị tất cả danh mục
  getAllCategories = async (req, res) => {
    try {
      const data = await CategoryService.getAllCategories();
      ResponseHandler.success(res, data, "Categories fetched successfully");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };

  // Hiển thị tất cả sản phẩm theo từng danh mục
  getProductsByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const data = await CategoryService.getProductsByCategory(categoryId);
      ResponseHandler.success(res, data, "Products by category");
    } catch (err) {
      ResponseHandler.error(res, err.message);
    }
  };
}

export default new CategoryController();
