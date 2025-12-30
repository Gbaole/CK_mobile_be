import mongoose from "mongoose";
import { OrderStatus, PaymentMethod } from "../enums/order.enum.js";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PROCESSING,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: String,
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: PaymentMethod.CREDITCARD,
    },
    totalPrice: { type: Number, required: true },
  },

  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
