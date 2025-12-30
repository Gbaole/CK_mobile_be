import categoryRepository from "../repositories/category.repository.js";
import productRepository from "../repositories/product.repository.js";
import CategoryMapper from "../mappers/category.mapper.js";
import ProductMapper from "../mappers/product.mapper.js";

class CategoryService {
  async getAllCategories() {
    const categories = await categoryRepository.findAll();
    return CategoryMapper.mapToList(categories);
  }

  async getProductsByCategory(categoryId) {
    const products = await productRepository.findAll(
      { category: categoryId },
      { populate: "brand category", sort: { createdAt: -1 } },
    );

    return ProductMapper.mapToList(products);
  }
}

export default new CategoryService();
