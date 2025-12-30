import BaseRepository from "./base.repository.js";
import Cart from "../models/cart.model.js";
import mongoose from "mongoose";

class CartRepository extends BaseRepository {
  constructor() {
    super(Cart);
  }

  async findCartByUserId(userId) {
    const cart = await this.model.findOne({userId});
    return cart ?? await this.model.create({ userId, items: [] })
  }

}

export default new CartRepository();
