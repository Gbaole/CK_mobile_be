import categoryRepository from "../repositories/category.repository.js";
import productRepository from "../repositories/product.repository.js";

class CategoryService {
  async getAllCategories() {
    return await categoryRepository.findAll();
  }

  async getProductsByCategory(categoryId) {
    return await productRepository.findAll(
      { category: categoryId },
      { populate: "brand category", sort: { createdAt: -1 } }
    );
  }
}

export default new CategoryService();
