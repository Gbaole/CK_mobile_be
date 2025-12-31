import CartRepository from "../repositories/cart.repository.js";
import OrderRepository from "../repositories/order.repository.js";
import UserReposiotry from "../repositories/user.reposiotry.js";
class OrderService {
  async checkOut(userId, shippingAddress) {
    const cart = await CartRepository.findCartByUserId(userId);
    if (cart.items.length < 0) throw new Error("item = 0 ");
    const user = await UserReposiotry.findById({ id: userId });

    // edit optiom arr
    return await OrderRepository.create({
      userId: user,
      items: cart.items,
      shippingAddress: shippingAddress,
      totalPrice: cart.totalPrice,
    });
  }
}

export default new OrderService();
