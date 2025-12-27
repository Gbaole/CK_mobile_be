import jwt from "jsonwebtoken";

export function generateToken(user = {}) {
  const { _id = "", name = "Guest", email = "", role = "customer" } = user;

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET chưa được cấu hình");
  }

  const payload = {
    id: _id,
    name,
    email,
    role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
}
export function decodeToken(token) {
  return jwt.decode(token);
}
export function verifyToken(token, secret = process.env.JWT_SECRET) {
  return jwt.verify(token, secret);
}
