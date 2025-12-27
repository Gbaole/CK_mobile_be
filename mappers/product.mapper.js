import { describe } from "zod/mini";
import { ProductOutputSchema } from "../validators/output/product.output.validator.js";

class ProductMapper {
  static mapToDetail(model) {
    if (!model) return null;

    const data = {
      id: model._id.toString(),
      name: model.name,
      type: model.type,
      sold: model.sold,
      brand:
        model.brand && typeof model.brand === "object"
          ? {
              id: model.brand._id.toString(),
              name: model.brand.name,
              slug: model.brand.slug,
            }
          : null,
      category:
        model.category && typeof model.category === "object"
          ? {
              id: model.category._id.toString(),
              name: model.category.name,
              slug: model.category.slug,
            }
          : null,
      price: model.price,
      images: model.images || [],
      description: model.description || null,
      createdAt: model.createdAt.toISOString(),
    };

    return ProductOutputSchema.parse(data);
  }

  /**
   * Mapper cho danh sách sản phẩm
   */
  static mapToList(models) {
    if (!Array.isArray(models)) return [];
    return models.map((m) => this.mapToDetail(m));
  }
}

export default ProductMapper;
