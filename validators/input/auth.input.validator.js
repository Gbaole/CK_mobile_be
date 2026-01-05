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

export const UpdateProfileInputSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được quá 50 ký tự")
      .optional(),

    phoneNumber: z
      .string()
      .trim()
      .min(9, "Số điện thoại phải từ 9 - 12 số")
      .max(12, "Số điện thoại phải từ 9 - 12 số")
      .regex(
        /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
        "Số điện thoại không đúng định dạng Việt Nam"
      )
      .optional(),
    email: z
      .string()
      .trim()
      .email({ message: "Email không đúng định dạng" })
      .optional(),
    shippingAddress: z
      .string()
      .trim()
      .min(9, "Địa chỉ không được ngắn quá")
      .optional(),
  })
  .strict();
