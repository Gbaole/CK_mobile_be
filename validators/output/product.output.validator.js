import { z } from "zod";

// Schema con cho Brand và Category xuất hiện trong Product
const NestedInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ProductOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  sold: z.number(),
  brand: NestedInfoSchema.nullable(),
  category: NestedInfoSchema.nullable(),
  price: z.number(),
  images: z.array(z.string()),
  createdAt: z.string(),
  description: z.string().nullable(),
  specs: z
    .object({
      storage: z.string().optional().nullable(),
      color: z.string().optional().nullable(),
      region: z.string().optional().nullable(),
    })
    .nullable()
    .optional(),
});
