import { CartOutputSchema } from "../validators/output/cart.output.validator.js";

class CartMapper {
  static mapToDTO(model) {
    if (!model) return null;

    const data = {
      id: model._id.toString(),
      userId: model.userId.toString(),
      totalPrice: model.totalPrice || 0,
      updatedAt: model.updatedAt
        ? model.updatedAt.toISOString()
        : new Date().toISOString(),
      items: (model.items || []).map((item) => {
        // 1. Xử lý productId (Lấy ID duy nhất)
        const isPopulated =
          item.productId && typeof item.productId === "object";
        const prodId = isPopulated
          ? item.productId._id.toString()
          : item.productId.toString();

        // 2. Lấy ảnh (Nếu đã populate thì lấy từ product, nếu không lấy mảng rỗng)
        // Điều này giúp Android hiển thị hình ảnh trong giỏ hàng dễ dàng hơn
        const images =
          isPopulated && item.productId.images ? item.productId.images : [];

        return {
          id: item._id.toString(), // ID của dòng item
          productId: prodId, // ID của sản phẩm (Dùng để xóa/update)
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          images: images,
        };
      }),
    };

    return CartOutputSchema.parse(data);
  }
}

export default CartMapper;
