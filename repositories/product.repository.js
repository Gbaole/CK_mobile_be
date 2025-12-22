import BaseRepository from "./base.repository.js";
import Product from "../models/product.model.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  // tìm theo slug
  async findBySlug(slug) {
    return await this.model.findOne({ slug }).populate("brand category").exec();
  }
}

export default new ProductRepository();
