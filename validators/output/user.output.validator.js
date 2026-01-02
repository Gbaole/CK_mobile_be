import { z } from "zod";
import { AccountRole, AccountStatus } from "../../enums/user.enum.js";

// Validator cho MongoDB ObjectId
const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const UserSchema = z.object({
  id: objectIdSchema,
  name: z.string().min(1),
  avatarURL: z.string().nullable().default(null),
  shippingAddress: z.string().min(1),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().nullable().default(null),
  password: z.string().optional(),
  status: z.nativeEnum(AccountStatus),
  role: z.nativeEnum(AccountRole),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
  __v: z.number().int().optional(),
});

export const LoginDataSchema = z.object({
  user: UserSchema,
  token: z.string().min(1, "Token is required"),
});
