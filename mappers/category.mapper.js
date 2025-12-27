import { CategorySchema } from "../validators/output/category.output.validator.js";

class CategoryMapper {
  /**
   * Mapper cho chi tiết một danh mục
   */
  static mapToDetail(model) {
    if (!model) return null;

    // Loại bỏ các trường kỹ thuật không cần thiết cho client
    const detailSchema = CategorySchema.omit({
      createdAt: true,
      updatedAt: true,
      __v: true,
    });

    return detailSchema.parse({
      id: model._id.toString(),
      name: model.name,
      slug: model.slug,
      description: model.description || null,
    });
  }

  /**
   * Mapper cho một item trong danh sách (giữ lại các trường cơ bản)
   */
  static mapToListItem(model) {
    if (!model) return null;
    const listSchema = CategorySchema.omit({
      updatedAt: true,
      slug: true,
    });

    return listSchema.parse({
      id: model._id.toString(),
      name: model.name,
      createdAt: model.createdAt ? model.createdAt.toISOString() : undefined,
    });
  }

  /**
   * Mapper cho danh sách nhiều danh mục
   */
  static mapToList(models) {
    if (!Array.isArray(models)) return [];
    return models.map((m) => this.mapToListItem(m));
  }
}

export default CategoryMapper;
