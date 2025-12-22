import mongoose from "mongoose";
import Brand from "./brand.model.js";
import Category from "./category.model.js";
import { ProductType } from "../enums/product.enums.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: Object.values(ProductType),
      required: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Brand,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0, // percent %
    },

    stock: {
      type: Number,
      default: 0,
    },

    condition: {
      type: String,
      enum: ["new", "used", "like_new"],
      default: "new",
    },

    description: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    // Thông số kỹ thuật
    specs: {
      storage: String,
      color: String,
      region: String, // US / JP / EU
    },

    // filter
    slug: {
      type: String,
      unique: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
