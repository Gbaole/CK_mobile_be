import BaseRepository from "./base.repository.js";
import Order from "../models/order.model.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }
  async getOrdersByUserId(userId) {
    const orders = await OrderRepository.findAll(
      { userId: userId },
      {
        populate: "items.productId",
        sort: { createdAt: -1 },
      }
    );
    return orders;
  }
}

export default new OrderRepository();
