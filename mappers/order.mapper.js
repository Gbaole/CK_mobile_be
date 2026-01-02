import { OrderOutputSchema } from "../validators/output/order.output.validator.js";

class OrderMapper {
  static mapToDTO(model) {
    if (!model) return null;

    const data = {
      id: model._id.toString(),
      status: model.status,
      shippingAddress: model.shippingAddress || "",
      totalPrice: model.totalPrice || 0,
      createdAt: model.createdAt
        ? model.createdAt.toISOString()
        : new Date().toISOString(),
      items: (model.items || []).map((item) => {
        const isPopulated =
          item.productId && typeof item.productId === "object";

        const image =
          isPopulated &&
          item.productId.images &&
          item.productId.images.length > 0
            ? item.productId.images[0]
            : null;

        const prodId = isPopulated
          ? item.productId._id.toString()
          : item.productId.toString();

        return {
          id: item._id.toString(),
          productId: prodId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: image,
        };
      }),
    };

    return OrderOutputSchema.parse(data);
  }

  static mapListToDTO(models) {
    if (!models || !Array.isArray(models)) return [];
    return models.map((model) => this.mapToDTO(model));
  }
}

export default OrderMapper;
