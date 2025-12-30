import { z } from "zod";

const productId = z
  .string()
  .min(1)

const quantity = z
  .number()
  .min(1)

export const removeProductFormCartSchema = z.object({
  productId: productId
})

export const addProductToCartSchema = z.object({
  productId: productId,
  quantity: quantity

})

