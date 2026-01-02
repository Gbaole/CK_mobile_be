import CartRepository from "../repositories/cart.repository.js";
import OrderRepository from "../repositories/order.repository.js";
import UserReposiotry from "../repositories/user.reposiotry.js";
import OrderMapper from "../mappers/order.mapper.js";
class OrderService {
  async getOrdersByUserId(userId) {
    const order = await OrderRepository.findAll(
      { userId: userId },
      {
        populate: "items.productId",
        sort: { createdAt: -1 },
      }
    );
    return OrderMapper.mapListToDTO(order);
  }

  async checkOut(userId, shippingAddress) {
    const cart = await CartRepository.findCartByUserId(userId);
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");
    const user = await UserReposiotry.findById(userId);

    return await OrderRepository.create({
      userId: user._id,
      items: cart.items,
      shippingAddress: shippingAddress,
      totalPrice: cart.totalPrice,
    });
  }
}

export default new OrderService();
