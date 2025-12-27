import { z } from "zod";

export const LoginInputSchema = z.object({
  identifier: z
    .string({ required_error: "Email hoặc số điện thoại là bắt buộc" })
    .trim()
    .min(1, "Vui lòng nhập email hoặc số điện thoại"),

  password: z
    .string({ required_error: "Mật khẩu là bắt buộc" })
    .min(1, "Vui lòng nhập mật khẩu"),
});
