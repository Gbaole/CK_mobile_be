import { z } from "zod";

const address = z
  .string()
  .min(1)


export const checkOutSchema = z.object({
  address: address
})


