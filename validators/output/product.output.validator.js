import { z } from "zod";
import { ProductType } from "../enums/product.enums.js";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const ProductInputSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),

  type: z.nativeEnum(ProductType, {
    errorMap: () => ({ message: "Invalid product type" }),
  }),

  brand: objectIdSchema, // Nhận vào ID của Brand

  category: objectIdSchema, // Nhận vào ID của Category

  price: z.number().min(0, "Price must be at least 0"),

  discount: z.number().min(0).max(100).default(0),

  stock: z.number().int().min(0).default(0),

  condition: z.enum(["new", "used", "like_new"]).default("new"),

  description: z.string().optional(),

  images: z.array(z.string().url("Must be a valid URL")).default([]),

  // Thông số kỹ thuật
  specs: z
    .object({
      storage: z.string().optional(),
      color: z.string().optional(),
      region: z.enum(["US", "JP", "EU"]).optional(),
    })
    .optional(),

  slug: z.string().optional(),
  sold: z.number().int().min(0).default(0),
});

// Validator cho lúc cập nhật (cho phép các trường là optional)
export const UpdateProductSchema = ProductInputSchema.partial();
