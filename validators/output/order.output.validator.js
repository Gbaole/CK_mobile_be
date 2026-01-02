// validators/output/order.output.validator.js
import { z } from "zod";

const OrderItemOutputSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  image: z.string().nullable().optional(),
});

export const OrderOutputSchema = z.object({
  id: z.string(),
  status: z.string(),
  shippingAddress: z.string(),
  totalPrice: z.number(),
  createdAt: z.string(),
  items: z.array(OrderItemOutputSchema),
});
