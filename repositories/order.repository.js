import BaseRepository from "./base.repository.js";
import Order from "../models/order.model.js";
import mongoose from "mongoose";

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  
}

export default new OrderRepository();
