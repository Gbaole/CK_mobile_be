import productRepository from "../repositories/product.repository.js";

class ProductService {
  // sản phẩm bán chạy nhất
  async getTopSelling(limit = 10) {
    return await productRepository.findAll(
      {},
      {
        sort: { sold: -1 },
        limit,
        populate: "brand category",
      }
    );
  }

  // sản phẩm mới nhất <= 7 ngày
  async getNewProducts(limit = 10) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return await productRepository.findAll(
      {
        createdAt: { $gte: sevenDaysAgo },
      },
      {
        sort: { createdAt: -1 },
        limit,
        populate: "brand category",
      }
    );
  }
}

export default new ProductService();
