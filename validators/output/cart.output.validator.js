import { z } from "zod";

const CartItemOutputSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  images: z.array(z.string()).default([]),
  id: z.string(),
});

export const CartOutputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(CartItemOutputSchema),
  totalPrice: z.number(),
  updatedAt: z.string(),
});
