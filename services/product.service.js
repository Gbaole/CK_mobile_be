import ProductRepository from "../repositories/product.repository.js";
import ProductMapper from "../mappers/product.mapper.js";
class ProductService {
  async checkAvailableProductStock(id, quantity) {
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    if (product.stock < quantity) {
      throw new Error("Số lượng sản phẩm không đủ");
    }
    return product;
  }

  async getProductDetail(id) {
    const product = await ProductRepository.getProductById(id);
    // console.log(product);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    return ProductMapper.mapToDetail(product);
  }
  async getAllProducts(limit = 10) {
    const products = await ProductRepository.findAll(
      {},
      {
        sort: { createdAt: -1 },
        limit,
        populate: "brand category",
      }
    );
    return ProductMapper.mapToList(products);
  }

  // sản phẩm bán chạy nhất
  async getTopSelling(limit = 10) {
    return await ProductRepository.findAll(
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

    return await ProductRepository.findAll(
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
